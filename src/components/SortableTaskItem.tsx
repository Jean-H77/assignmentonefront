import React, {useState} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Card from 'react-bootstrap/Card';
import {Button} from "react-bootstrap";
import EditTaskModalForm from "./EditTaskModalForm";

export default function SortableItem(props : any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [show, setShow] = useState(false);

    const onButtonClick = async () => {
        setShow(true);
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card>
                <Card.Header className="d-flex justify-content-center">
                    This is task number {props.id} - Display Order: {props.index+1}</Card.Header>
                <Card.Body className="d-flex justify-content-center">
                    <Button variant="primary" onClick={onButtonClick}>View Details</Button>
                </Card.Body>
            </Card>
            <EditTaskModalForm show={show} setShow={setShow} slotField={props.id}/>
        </div>
    );
}
