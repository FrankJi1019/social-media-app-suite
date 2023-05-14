import React, { FC, useState } from "react"
import { Autocomplete, InputAdornment, TextField } from "@mui/material"
import TagIcon from "@mui/icons-material/Tag"

export interface TagDropdownProps {
  tagList: Array<string>
  onAddingNewTag: (newTag: string) => void
  onFinishAdding: () => void
}

const TagDropdown: FC<TagDropdownProps> = ({
  tagList,
  onAddingNewTag,
  onFinishAdding
}) => {
  const [inputValue, setInputValue] = useState("")

  return (
    <Autocomplete
      freeSolo
      inputValue={inputValue}
      options={tagList}
      onBlur={onFinishAdding}
      onInputChange={(e, newValue, reason) => {
        if (reason === "input") {
          setInputValue(newValue.toLowerCase())
        }
      }}
      onChange={(e, newValue: string | null) => {
        if (!newValue) return
        setInputValue("")
        onAddingNewTag(newValue)
      }}
      renderInput={(params) => (
        <TextField
          variant={"outlined"}
          autoFocus
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <TagIcon sx={{ color: "primary.dark" }} />
              </InputAdornment>
            )
          }}
          sx={{
            "& fieldset": {
              border: "1px solid",
              borderColor: "primary.main"
            }
          }}
        />
      )}
    />
  )
}

export default TagDropdown
