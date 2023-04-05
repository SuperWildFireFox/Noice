import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import AddItem from "./AddItem";
import Item from "./Item";

export default function PlayList(props) {
    // hooks
    // const [itemData, setItemData] = useState(props.reminderTask);
    const [itemData, setItemData] = useState(JSON.parse(localStorage.getItem('playList')));
    const [showAddTemplate, setShowAddTemplate] = useState(false);
    

    // 修改处在添加 item 的状态
    function changeShowAddTemplate(s,event) {
        setShowAddTemplate(s);
    }
    // 添加 items
    function addItem(itemName, video_url, audio_src, itemPlayTime,
        isOriginal_duration) {
        const newItem = {
            id: `re-${nanoid()}`,
            title : itemName,
            all_times : itemPlayTime,
            video_url : video_url,
            audio_src : audio_src
        }
        setItemData([...itemData, newItem]);

    }
    // delete item
    function deleteItem(id){
        const newItem = itemData.filter((item) => item.id !== id);
        setItemData(newItem);
    }

    const itemList = itemData.map((task) => (
        <Item
            id={task.id}
            key={task.id}
            title={task.title}
            all_times={task.all_times}
            video_url={task.video_url}
            audio_src={task.audio_src}
            isEdit={false}
            deleteItem={deleteItem}
        />
    ));
    
    useEffect(() => {
        console.log("dfljahsdflhhas;kjdfh");
        localStorage.setItem('playList', JSON.stringify(itemData));
    }, [itemData]);

    return (
        <div class="container h-screen w-full flex flex-col ">
            <div class="h-full flex flex-col py-4 md:py-0 px-4 md:px-0 xl:px-5 ">
                <div class="w-full h-full overflow-auto mt-0 bg-white " id="journal-scroll">
                    <div class=" m-3 relative space-y-4 ">
                        {itemList}
                        <AddItem
                         addItem={addItem}
                         changeShowAddTemplate={changeShowAddTemplate}
                         showAddTemplate={showAddTemplate} />
                    </div>
                </div>
            </div>
        </div>
    )
}