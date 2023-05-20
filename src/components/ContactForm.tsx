import Button from "./Button"
import Input from "./Input"

import { useForm } from 'react-hook-form'
import { server_calls } from '../api/server'
import { useDispatch, useStore } from 'react-redux';
import { chooseYear, chooseType, chooseColor, chooseMake, chooseModel } from "../redux/slices/RootSlice";

interface ContactFormProps {
  id?: string[]
}

const ContactForm = (props:ContactFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id[0], data)
      console.log(`Updated: ${ data.name } ${ props.id }`)
      setTimeout(() => {window.location.reload()}, 500);
      event.target.reset()
    } else {
      dispatch(chooseYear(data.car_year));
      dispatch(chooseType(data.car_type));
      dispatch(chooseColor(data.color));
      dispatch(chooseMake(data.make));
      dispatch(chooseModel(data.model)); 

      server_calls.create(store.getState())
      setTimeout( () => {window.location.reload()}, 500);

    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="car_year">Car Year</label>
          <Input {...register('car_year')} name='car_year' placeholder="Car Year"/>
        </div>
        <div>
          <label htmlFor="car_type">Car Type</label>
          <Input {...register('car_type')} name='car_type' placeholder="Car Type"/>
        </div>
        <div>
          <label htmlFor="Color">Color</label>
          <Input {...register('color')} name='color' placeholder="Color"/>
        </div>
        <div>
          <label htmlFor="Make">Make</label>
          <Input {...register('make')} name='make' placeholder="Make"/>
        </div>
        <div>
          <label htmlFor="Model">Model</label>
          <Input {...register('model')} name='model' placeholder="Model"/>
        </div>
        <div className="flex p-1">
          <Button
            className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
            >
              Submit
          </Button>
        </div>
      </form>

    </div>
  )
}

export default ContactForm