"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Button, Col, Row} from "reactstrap";
import {post} from "@/core/httpClient";
import {useAuth} from "@/contexts/authContext";

export default function LoginPage() {
    const router = useRouter();
    const {setAuthToken} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async () => {
        try {
            const response = await post("/auth/login", {email, password});
            setAuthToken(response.data.token, response.data.refreshToken);
            router.push("/");
        } catch {
            setError("Neuspesan login. Proverite email i lozinku.");
        }
    }

    return (
        <Row className="justify-content-center">
            <Col md={6}>
                <h3 className="mb-3">Login</h3>

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

                <Button color="primary" onClick={login}>Login</Button>
            </Col>
        </Row>
    );
}
