
import React, { MouseEvent, useContext } from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { IExchangeRates } from '../../Redux/interfaces';
import { Context } from '../context';
import { useEffect } from 'react';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({

    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      width:'40px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);




type props ={
  fieldFromTransfer:string
}
type allProps = props & IExchangeRates;


const TransferFrom:React.FC<allProps> = (props) => {
  const classes = useStyles();
  const [rates, setRates] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => setRates(event.target.value as string);
  


    
 let filterItems =  Object.entries(props.conversion_rates).filter(([key,value]) => key.toLocaleLowerCase().indexOf(props.fieldFromTransfer.toLowerCase()) !== -1);




  const {getRates,getCurrenttValueFrom,changeBaseValue} = useContext(Context);

  
useEffect(()=>{
if(rates === "") return;
  getRates(rates.split(" ")[1]);
},[rates])

  return (
    <div>
      
      <FormControl className={classes.margin}>
        <NativeSelect
          id="demo-customized-select-native"
          value={rates}
          onChange={handleChange}
          onClick = {getCurrenttValueFrom}  
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />

               { Object.entries(filterItems).map(([key,value]) =>  <option  key = {`${value}`+Math.floor(Math.random()*1000)} value ={`${value[1]} ${value[0]}`}>{value[0] }</option> )}
                  
            
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default TransferFrom;