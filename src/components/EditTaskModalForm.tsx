import { Modal, Button, Form } from 'react-bootstrap';
import React, {FormEvent, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// @ts-ignore
export default function EditTaskModalForm({show, setShow, slotField}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [comment, setComment] = useState('');
    const [displayedComments, setDisplayedComments] = useState('');

    const clearInputs = () => {
        setName('');
        setDescription('');
    }

    const handleClose = () => {
        setShow(false);
        clearInputs();
    };

    const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Task Name:', name);
        console.log('Task Description:', description);
        console.log("SlotField: " + slotField)
        try {
            const response = await axios.put(
                'http://localhost:8080/tasks/'+slotField,
                {
                    name,
                    description,
                }
            );
            console.log('Task updated successfully', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        clearInputs();
    };

    const handleAddComment = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/tasks/comments/'+slotField,
                {
                    comment
                }
            );
            console.log('Comment added successfully', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        setComment('');
    }

    if(show) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleUpdate}>
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
                            <br/>
                            <Button variant="info" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Body>
                        <Modal.Header>
                            <Modal.Title>Comments</Modal.Title>
                        </Modal.Header>
                        <br/>
                    <Form onSubmit={handleAddComment}>
                        <Form.Group controlId="formComment">
                            <Form.Label>Comment On Task</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter comment here"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>
                        <br/>
                        <Button variant="dark" type="submit">
                            Add Comment
                        </Button>
                    </Form>
                        </Modal.Body>
                </Modal>
            </div>
        );
    } else {
        return (
          <div></div>
        );
    }
}