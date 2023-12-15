import React, {useEffect, useState} from 'react';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import SortableItem from "./SortableTaskItem";
import axios from "axios";

export default function DroppableTaskList () {
    const [items, setItems] = useState(['1','2','3']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/tasks');
                const data = response.data;
                setItems(data);
                console.log("Fetched: " + data)
            } catch (error) {
                console.error('Error fetching data:');
            }
        };
        fetchData();
    }, []);


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const updateData = async (oldIndex : number, newIndex : number) => {
        try {
            const response = await axios.put('http://localhost:8080/tasks/{oldIndex}/{newIndex}');
            const data = response.data;
            console.log("Response: " + data)
        } catch (error) {
            console.error('Error updating data:');
        }
    };

    const handleDragEnd = (event : any) => {
        const {active, over} = event;
        if(active.id !== over.id) {
            setItems((items) => {
               const oldIndex = items.indexOf(active.id);
               const newIndex = items.indexOf(over.id);
               updateData(oldIndex, newIndex);
               return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

        return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
        >
        <SortableContext
            items={items} strategy={verticalListSortingStrategy}>
                {items.map((id, index) => <SortableItem key={id} id={id} index={index}/>)}
        </SortableContext>
        </DndContext>
    );
}