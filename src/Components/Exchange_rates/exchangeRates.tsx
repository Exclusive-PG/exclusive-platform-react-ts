import React, { useState, useEffect } from "react";
import s from "./../../styles/ExchangeRates/exchangeRates.module.scss";
import axios from "axios";
import { IExchangeRates } from "./../../Redux/interfaces";
import { ValidationTextField, useStylesRates } from "./materialUI";
import { InputAdornment } from "@material-ui/core";
import TransferFrom from "./TranserFrom";
import TransferTo from "./TransferTo";
import { Context } from "../context";


const ExchangeRates: React.FC = () => {
  useEffect(() => getRates(base), []);

  const [rates, setRates] = useState<IExchangeRates>();
  const [fieldRates, setFieldRates] = useState<string>("");

  const [base , setBase] = useState<string>("USD");
  const [fieldFromTransfer, setFieldFromTransfer] = useState<string>("");
  const [fieldToTransfer, setFieldToTransfer] = useState<string>("");

  const [valueFrom,setValueFrom] = useState<string>("1");

  const [valueTo,setValueTo] = useState<string>("1");

  const classes = useStylesRates();



  const getRates = (base: string) => {
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/32f7694b4c59280664e06bd2/latest/${base} `
      )
      .then((response: any) => {
        const { data } = response;
        if(data === undefined || data === null) return;
         setRates(data);
         console.log(data);
      })

      .catch((error: Error) =>console.log(error.message))
  };

const changeInputRates = (event:React.ChangeEvent<HTMLInputElement>) => setFieldRates(event.target.value)
const changeInputFromTransfer = (event:React.ChangeEvent<HTMLInputElement>) => setFieldFromTransfer(event.target.value)
const changeInputToTransfer = (event:React.ChangeEvent<HTMLInputElement>) => setFieldToTransfer(event.target.value)
const getCurrenttValueFrom = (event:any) => setValueFrom(event.target.value);
const getCurrentValueTo= (event:any) => setValueTo(event.target.value);
const changeBaseValue = (base:string) => setBase(base);


console.log(isNaN(parseFloat(valueTo)))

  return (

  <Context.Provider value = {{getCurrenttValueFrom,getCurrentValueTo,changeBaseValue,getRates}}>
    <main> 
      <section>
        <div className={s.wrapper_rates}>
          <h1 style = {{paddingTop:"50px",color:"#5F666C"}}>Exchange Rates</h1>

          {rates !== undefined && (
            <>

                 <section className={s.wrapper_form} style = {{paddingTop:"150px"}}>
                
                  <ValidationTextField
                    className={classes.margin}
                    label={`Amount`}
                    value = {fieldRates}
                    variant="outlined"
                    // defaultValue={(1).toFixed(2)}
                    placeholder = "Input currency"
                    id="input_current_rates"
                    onChange = {changeInputRates}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{`${rates!.base_code}`}</InputAdornment>,
                    }}
                  />
                  
                  <ValidationTextField
                    className={classes.margin}
                     label={`From`}
                    variant="outlined"
                    id="from_rates"
                    placeholder = "Input currency"
                    value = {fieldFromTransfer}
                     onChange = {changeInputFromTransfer}
                    InputProps={{
                       startAdornment: <TransferFrom {...rates} fieldFromTransfer = {fieldFromTransfer}/>,
                    }}
                  />
                
                <ValidationTextField
                    className={classes.margin}
                     label={`To`}
                    variant="outlined"
                    placeholder = "Input currency"
                    id="to_rates"
                    value = {fieldToTransfer}
                     onChange = {changeInputToTransfer}
                    
                    InputProps={{
                       startAdornment: <TransferTo {...rates} fieldToTransfer = {fieldToTransfer}/>,
                    }}
                  />   


                </section>
                <section>


                      <div className={s.wrapper_counting}>
                        <div className ={s.main_title_total}>Total:</div>
                        {/* <div>{   `1 ${rates.base_code} = ${valueFrom} ` }</div> */}
                        {
                          (isNaN(parseFloat(fieldRates) * parseFloat(valueTo.split(" ")[0])) === false && valueTo.split(" ")[1] !== undefined ) ? `${fieldRates} ${rates.base_code} = ${parseInt(fieldRates).toFixed(2)} * ${parseInt(valueTo.split(" ")[0]).toFixed(2)} = ${(parseFloat(fieldRates) * parseFloat(valueTo.split(" ")[0])).toFixed(2)} ${valueTo.split(" ")[1]} ` 
                          : "Please enter data from and to" 
                        
                        //TOTAL = 1000 AFN = 1000 * 1.2567 = 1256.6999999999998 ALL
                        }

                        
                      </div>
                </section>
            </>
          )}
        </div>
      </section>
    </main>
    </Context.Provider>
  );
};
export default ExchangeRates;
