import React, { useEffect, useState } from 'react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import "./ques.css"

export default function Ques() {

    const[initVal, setInitVal] = useState(0)
    const[ques, setQues] = useState("")


    const onNextBtn = () =>{
        setInitVal(initVal + 1)        
    }

    const onPrevBtn = () =>{
        setInitVal(initVal - 1)        
    }

    const updateQues = () => {
        let ques_id = initVal == 0 ? "AreaUnderTheCurve_901" : initVal == 1 ? "BinomialTheorem_901" : "DifferentialCalculus2_901"
        let params = {QuestionID:ques_id}
        Axios.get("https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails", {params}).then((response) => {
          setQues(response.data[0]?.Question);
        });
    }

    useEffect(
        () => {updateQues()},[]
    )

    useEffect(
        ()=>{
            updateQues()  
            if(initVal>2){
                setInitVal(0)
            }
            else if(initVal<0){
                setInitVal(2)
            }
        },[initVal]
    )

    console.log(ques);
    return (
            <div className='ques-cont'>
                <button title='Prev. Question' className='q-btn' onClick={()=>onPrevBtn()}><i className="fas fa-arrow-left"></i></button>
                <div className="ques-block">
                    <MathJaxContext>
                        <MathJax>{ques}</MathJax>
                    </MathJaxContext>
                </div>
                <button title='Next Question'className='q-btn' onClick={()=>onNextBtn()}><i className="fas fa-arrow-right"></i></button>
            </div>
    )
}
