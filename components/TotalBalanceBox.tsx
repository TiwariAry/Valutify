import React from 'react'
import AnimatedCounter from "@/components/AnimatedCounter";
import DoughnutChart from "@/components/DoughnutChart";

const TotalBalanceBox = ({accounts=[], totalbanks, totalCurrentBalance}) => {
    return (
        <section className={"total-balance"}>
            <div className={"total-balance-chart"}>
                <DoughnutChart accounts={accounts}/>
            </div>
            <div className={"flex flex-col gap-6"}>
                <h2 className={"header-2"}>
                    Bank Accounts: {totalbanks}
                </h2>
                <div className={"flex flex-col gap-2"}>
                    <p className={"total-balance-label"}>
                        Total Current Balance
                    </p>
                    <div className={"total-balance-amount flex-center gap-2"}>
                        {/*CountUp is using useRef and you have to use it inside Client side*/}
                        <AnimatedCounter amount={totalCurrentBalance}/>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default TotalBalanceBox
