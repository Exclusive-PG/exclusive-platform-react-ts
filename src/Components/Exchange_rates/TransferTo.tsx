import React, { useContext } from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { IExchangeRates } from '../../Redux/interfaces';
import { Context } from '../context';

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
  fieldToTransfer:string
}

type allProps = props & IExchangeRates;

const TransferTo:React.FC<allProps> = (props) => {
  const classes = useStyles();
  const [rates, setrates] = React.useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setrates(event.target.value as string);
  };


    
 let filterItems =  Object.entries(props.conversion_rates).filter(([key,value]) =>
     key.toLocaleLowerCase().
    indexOf(props.fieldToTransfer.toLowerCase()) !== -1);

console.log(filterItems)

const {getCurrentValueTo} = useContext(Context);
  return (
    <div>
      
      <FormControl className={classes.margin}>
        <NativeSelect
          id="demo-customized-select-native"
          value={rates}
          onClick = {getCurrentValueTo}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />

               { Object.entries(filterItems).map(([key,value]) =>  <option key = {`${value}`+Math.floor(Math.random()*1000)} value ={`${value[1]} ${value[0]}`}>{value[0] }</option> )}
                  
            
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default TransferTo;