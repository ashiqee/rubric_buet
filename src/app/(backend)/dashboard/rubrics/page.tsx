import RubricCreateModal from "../../components/modals/RubricCreateModal";
import RubricsGrids from "../../components/RubricGrids";
import RubricsTemplateCreate from "../../components/RubricsTemplateCreate";

export default function RubricsPage() {
  return (
    <div className="flex flex-col gap-3">

      <RubricCreateModal/>
       <RubricsGrids/> 


    </div>
  );
}