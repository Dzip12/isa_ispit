'use client'
import {useForm} from "react-hook-form";
import {Button, Col, Row} from "reactstrap";
import {post} from "@/core/httpClient";


export default function UserCreate() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    }    = useForm({
        mode: "onSubmit"
    });

    return(
    <>
        <Row className="mb-3">
            <Col md={6}>
                <input type="text" className="form-control" placeholder="First Name" {...register("firstName", {
                    required: "First Name is required!",
                    maxLength: 50,
                    minLength: 3,
                })} />
                {errors && errors.firstName && (
                    <span className="text-danger">{errors.firstName.message}</span>
                )}
            </Col>

            <Col md={6}>
                <input type="text" className="form-control" placeholder="Last Name" {...register("lastName", {
                    required: "Last Name is required!",
                    maxLength: 50,
                    minLength: 3,
                })} />
                {errors && errors.lastName && (
                    <span className="text-danger">{errors.lastName.message}</span>
                )}
            </Col>
        </Row>

        <Row className="mb-3">
            <Col md={6}>
                <input type="email" className="form-control" placeholder="Email" {...register("email", {
                    required: "Email is required!",
                })}/>
                {errors && errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                )}
            </Col>

            <Col md={6}>
                <input type="password" className="form-control" placeholder="Password" {...register("password", {
                    required: "Password is required!",
                    minLength: 3,
                })}/>
                {errors && errors.password && (
                    <span className="text-danger">{errors.password.message}</span>
                )}
            </Col>
        </Row>
        <Row>
            <Col md="12">
                <Button className="btn btn-primary" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        await post("/user/create", data)
                    })();
                }}>
                    Submit
                </Button>
            </Col>
        </Row>
    </>
);
}