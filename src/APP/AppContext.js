import React, { createContext, useContext, useState } from "react";

const AccountContext = createContext();
const UpdateAccountContext = createContext();

export function useAccountContext() {
    const context =  useContext(AccountContext);

    if(!context) {
        throw new Error("useAccountContext must be used inside AccountProvider");
    }

    return context;
  }

  export function useUpdateAccountContext() {
    const context = useContext(UpdateAccountContext);

    if(!context) {
        throw new Error("useAccountContext must be used inside AccountProvider");
    }

    return context;
  }

function GlobalContext({children}) {
    const [account, setAccount] = useState([]); 

    return(
        <AccountContext.Provider value={account}>
            <UpdateAccountContext.Provider value={setAccount}>
            {children}
            </UpdateAccountContext.Provider>
        </AccountContext.Provider>
    )
}

export default GlobalContext;