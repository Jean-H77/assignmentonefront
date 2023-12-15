import { Modal, Button, Form } from 'react-bootstrap';
import React, {FormEvent, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function CreateTaskModalForm() {

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
    };

    const handleShow = () => setShow(true);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Task Name:', name);
        console.log('Task Description:', description);
        try {
            const response = await axios.post(
                'http://localhost:8080/tasks',
                {
                    name,
                    description
                }
            );
            console.log('Task created successfully', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        handleClose();
    };
    return (
        <div className="d-flex justify-content-center mt-5">
            <Button variant="primary" onClick={handleShow}>
                Create New Task
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create A New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTaskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task name here"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTaskDescription">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter task description here"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}