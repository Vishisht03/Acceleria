import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { GraduationCap, BookOpen } from "lucide-react";

function FormControls({ formControls = [], formData, setFormData }) {
    
    function renderComponentByType(getControlItem) {
        let element = null;
        const currentControlItemValue = formData[getControlItem.name] || "";

        switch (getControlItem.componentType) {
            case "input":
                element = (
                    <Input
                        id={getControlItem.name}
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        type={getControlItem.type}
                        value={currentControlItemValue}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />
                );
                break;
            
            case "select":
                element = (
                    <Select
                        onValueChange={(value) => setFormData({
                            ...formData,
                            [getControlItem.name]: value
                        })}
                        value={currentControlItemValue}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {getControlItem.options?.map((optionItem) => (
                                <SelectItem key={optionItem.id} value={optionItem.id}>
                                    {optionItem.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
                break;

            case "textarea":
                element = (
                    <Textarea
                        id={getControlItem.name}
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        value={currentControlItemValue}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />
                );
                break;

            case "div":
                element = (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {getControlItem.options?.map((optionItem) => (
                            <button
                                type="button"
                                key={optionItem.id}
                                value={optionItem.id}
                                
                                onClick={() => setFormData({
                                    ...formData,
                                    [getControlItem.name]: optionItem.id
                                })}
                                
                                className={`flex flex-col items-center justify-center p-4 border rounded-lg 
                                    ${currentControlItemValue === optionItem.id
                                        ? "border-blue-500 bg-blue-100 text-blue-700"
                                        : "border-gray-300 hover:border-blue-500"
                                    }`}
                            >
                                {optionItem.id === "user" ? (
                                    <GraduationCap className="w-6 h-6 mb-2" />
                                ) : (
                                    <BookOpen className="w-6 h-6 mb-2" />
                                )}
                                {optionItem.id.charAt(0).toUpperCase() + optionItem.id.slice(1)}
                            </button>
                        ))}
                    </div>
                );
                break;

            default:
                element = (
                    <Input
                        id={getControlItem.name}
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        type={getControlItem.type}
                        value={currentControlItemValue}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                    />
                );
                break;
        }
        return element;
    }
    
    return (
        <div className="flex flex-col gap-3">
            {formControls.map((controlItem) => (
                <div key={controlItem.name}>
                    <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
                    {renderComponentByType(controlItem)}
                </div>
            ))}
        </div>
    );
}

export default FormControls;
