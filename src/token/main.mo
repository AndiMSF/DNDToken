import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
    var owner : Principal = Principal.fromText("pa5to-kmoxw-hqqrr-dm6hr-kanwe-gzeym-fgnaf-ncktj-i7nn2-jz5ac-6qe");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DND";
    var bonusCoins : Nat = 10000;

    private stable var balanceEntries : [(Principal, Nat)] = [];
    // Buku besar
    // hash key dan mengambil value berdasarkan index nya menggunakan kunci
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    // Memasukkan key : owner dan value : totalSupply ke buku besar
    balances.put(owner, totalSupply);

    public query func balanceOf(who : Principal) : async Nat {

        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared (msg) func payOut() : async Text {
        Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller) == null) {
            let result = await transfer(msg.caller, bonusCoins);
            return result;
        } else {
            return "Already Claimed";
        }

    };

    public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
        let pemberiUang = await balanceOf(msg.caller);
        if (pemberiUang > amount) {
            let kurangin : Nat = pemberiUang - amount;
            balances.put(msg.caller, kurangin);

            let penerimaUang = await balanceOf(to);
            let tambahin : Nat = penerimaUang + amount;
            balances.put(to, tambahin);
            return "Success";
        } else {
            return "Insufficient Funds"
        }

    };

    // ini biar balance nya disimpen sementara disini saat deploy tidak ke reset = temporary
    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };

    // ini dari temporary dipindahkan kesini agar setelah di deploy dia value nya ttp sama
    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(),1, Principal.equal, Principal.hash);
        // ini untuk kasih owner / saya => andi token, agar bisa di berikan ke canister tokennya supaya canister bisa memberikan token ke pengguna / user lain
        if (balances.size() < 1) {
            balances.put(owner, totalSupply)
        }
    }

};
