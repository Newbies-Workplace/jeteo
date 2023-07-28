'use client'
import styles from "./StepButton.module.scss";
import cs from "classnames";
import React from "react";


interface StepViewProps {
    steps: string[]
    activeStepIndex: number
}

interface StepButtonProps {
    steps: string[]
    activeStepIndex: number
    onStepClicked: (index: number) => void
}


interface StepProps{
    title: string
    isSelected: boolean
}

const Step = ({ title, isSelected}: StepProps) => (
    <div className={styles.step}>
        <span className={cs(styles.index, {[styles.indexActive]: isSelected})}></span>

        <span className={cs(styles.text, {[styles.textActive]: isSelected})}>
            {title}
        </span>
    </div>
)

export const StepButton: React.FC<StepButtonProps> = ({steps, activeStepIndex, onStepClicked}) => (
    <div className={styles.clickableSteps}>
        {steps.map((step, i) =>
            <div key={i.toString()} onClick={() => onStepClicked(i)} className={styles.clickableStepContainer}>
                <Step
                    index={i + 1}
                    title={step}
                    isSelected={i === activeStepIndex}/>
            </div>
        )}
    </div>
)

interface StepProps {
    index: number
    title: string
    isSelected: boolean
}
