"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Button, Col, Row} from "reactstrap";
import {post} from "@/core/httpClient";

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const signup = async () => {
        try {
            await post("/auth/signup", {email, password});
            setMessage("Registracija je uspesna. Sada mozete da se ulogujete.");
            setError("");
        } catch {
            setError("Registracija nije uspela.");
            setMessage("");
        }
    }

    return (
        <Row className="justify-content-center">
            <Col md={6}>
                <h3 className="mb-3">Signup</h3>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Lozinka"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Button color="primary" className="me-2" onClick={signup}>Signup</Button>
                <Button color="link" onClick={() => router.push("/login")}>Idi na login</Button>
            </Col>
        </Row>
    );
}
