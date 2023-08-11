'use client'
import React from "react";
import styles from "./TagPicker.module.scss"
import { Tag } from "./Tag/Tag";
import { useState } from "react";
import { nanoid } from 'nanoid'


interface Tag {
  id: string,
  tagText: string,
}

export const TagPicker = () => {

  const [tag, setTag] = useState("")
  const [tagList,setTagList] = useState<Tag[]>([])

  function valOfTeg (event: React.ChangeEvent<HTMLInputElement>) {
    setTag(event.target.value)
  }

  const EnterDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(tag) {
      if (event.key === 'Enter') {
        createTag()
      }
    }  
  };
  
  function createTag() {
    const newTag: Tag = {
      id: nanoid(),
      tagText: tag,
    };
    setTagList((prevTagList) => [...prevTagList, newTag]);
    setTag("");
  }

  function deleteTag (id: string) {
    setTagList((oldTagList) => oldTagList.filter(oldTag => oldTag.id !== id))
  }

  const TagElements = tagList.map((t) => {
    return (
      <Tag
        key={t.id}
        value={t.tagText}
        del={() => deleteTag(t.id)}
      />
    )
  })

  return (
    <div className={styles.tagPicker}>
      {TagElements}
      <input 
        value={tag} 
        onChange={valOfTeg}
        onKeyDown={EnterDown}
        className={styles.input} 
        placeholder="Otaguj mnie"
      />
    </div>
  )
}