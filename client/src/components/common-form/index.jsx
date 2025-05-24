// import PropTypes from 'prop-types';
// import { GraduationCap, BookOpen } from "lucide-react";
import { Button } from "../ui/button";
import FormControls from "./form-controls";

function CommonForm({
    handleSubmit,
    buttonText,
    formControls = [],
    formData,
    setFormData,
    isButtonDisabled = false
}) {
    return (
        <form onSubmit={handleSubmit}>
            {/* render form controls here */}
            <FormControls
                formControls={formControls}
                formData={formData}
                setFormData={setFormData}
            />
            
            <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">{buttonText || "Submit"}</Button>
        </form>
    );
}

// CommonForm.propTypes = {
//     handleSubmit: PropTypes.func.isRequired,
//     buttonText: PropTypes.string,
//     formControls: PropTypes.arrayOf(PropTypes.object),
//     formData: PropTypes.object.isRequired,
//     setFormData: PropTypes.func.isRequired,
// };

export default CommonForm;
