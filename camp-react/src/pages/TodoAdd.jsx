import { Formik, Form, Field, ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { FormField, Button, Label } from 'semantic-ui-react'
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput'

export default function TodoAdd() {

    const initialValues = { id: 2, title: "" }
    const schema = Yup.object({
        title: Yup.string().required("todo adı zorunlu"),
        id: Yup.number().required("todo idsi zorunlu")
    })
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                <Form className='ui form'>
                    <KodlamaIoTextInput name="title" placeholder="yapılacak is" />
                    {/* <FormField>
                        <Field name="title" placeholder="yapılacak is" ></Field>
                        <ErrorMessage name='title' render={error =>
                            <Label pointing basic color='red' content={error}>

                            </Label>
                        } ></ErrorMessage>
                    </FormField> */}
                    <KodlamaIoTextInput name="id" placeholder="yapılacak is numarası" />
                    {/* <FormField>
                        <Field name="id" placeholder="yapılacak is numarası" ></Field>
                        <ErrorMessage name='id' render={error =>
                            <Label pointing basic color='red' content={error}>

                            </Label>
                        } ></ErrorMessage>
                    </FormField> */}
                    <Button color='green' type='submit'> Ekle

                    </Button>

                </Form>


            </Formik>
        </div>
    )
}
