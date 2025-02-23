// The right sidebar is not going to be inside the layout since it's not going to be present in every page

import React from 'react'
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";

const Home = () => {
    const loggedIn = {firstName: 'Aryan', lastName: 'Tiwari', email: 'aryantiwari122004@gmail.com'}

    return (
        <section className={"home"}>
            <div className={"home-content"}>
                <header className={"home-header"}>
                    <HeaderBox
                        type={"Greeting"}
                        title={"Welcome"}
                        user={loggedIn?.firstname || 'Guest'}
                        subtext={"Access and manage your account and transactions efficiently"}
                    />

                    <TotalBalanceBox
                        accounts={[]}
                        totalbanks={1}
                        totalCurrentBalance={1250.35}
                    />
                </header>

                recent transactions
            </div>

            <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 100.1}, {currentBalance: 10.1}]}/>
        </section>
    )
}
export default Home
