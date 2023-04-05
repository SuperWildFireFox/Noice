import React, { useState, useEffect } from "react";

export default function Item(props) {
    // hooks
    const [isEdit, setIsEdit] = useState(false);

    // 设置状态
    function unsetIsEdit(s,event){
        setIsEdit(s);
        
    }

    const ItemView = (
        <div class=" w-full  flex flex-col rounded-xl shadow-lg p-4">
            <div class="flex items-center justify-between my-3">
                <div class="flex items-baseline space-x-4">
                    <div class="rounded-full w-4 h-4 border-8 border-emerald-400"></div>
                    <div class="text-md font-bold text-xl">{props.title}</div>
                    {/* 时长 */}
                    <div class="text-sm">
                        时长: {props.all_times}
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    {/* 编辑按钮 */}
                    {/* <button
                        class="inline-flex items-center px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
                        <svg class="h-5 w-5 mr-0" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button> */}

                    {/* 删除按钮 */}
                    <button 
                        onClick={() => props.deleteItem(props.id)}
                        class="inline-flex items-center px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                    
                </div>
            </div>
            
        </div>
    );
    return ItemView;
}