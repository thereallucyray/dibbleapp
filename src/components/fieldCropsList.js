import { useEffect } from "react";
import CropList from "./cropList";

function FieldCropsList(field){
  console.log(field.field)
  
  return(
    <div>
      <h1>{field.field.fieldName}</h1>
      <CropList data={field.field.crops} fieldId={field.field.id}/>
    </div>
  );
};

export default FieldCropsList;