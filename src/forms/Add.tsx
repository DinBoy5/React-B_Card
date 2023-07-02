import Form from "../components/Form";
import { CardFields } from "../utils/fields";
import { cardSchema } from "../utils/schema";

function Add() {
    return <Form
        FormTitle='Create Card'
        FormFields={CardFields}
        FormSchema={cardSchema}
    ></Form>
}

export default Add;