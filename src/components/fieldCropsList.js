import { useEffect, useState } from "react";
import CropList from "./cropList";
import { getFieldActiveCrops } from "../api/FieldService";

function FieldCropsList({field, active}){
  console.log(field)
  const [crops, setCrops] = useState([]);
  const getActiveCrops = async () => {
    try {
      const data  = await getFieldActiveCrops(field.id);
      setCrops(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(active === true){
      getActiveCrops();
    } else {
      setCrops(field.crops)
    }
  }, [])
  
  return(
    <div>
      <h1>{field.fieldName}</h1>
      {crops && <CropList data={crops} fieldId={field.id}/>}
    </div>
  );
  
};

export default FieldCropsList;