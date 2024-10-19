import { useState } from "react";
import axiosInstance from "../../config/axiosConfig";

const AdminFileUpload = () =>{
    const [file, setFile] = useState(null);

    // 파일 선택 핸들러
    const handleFileChange = (e) =>{
        setFile(e.target.files[0]);
    }

    // 파일 업로드
    const fileUpload = async (e) =>{
        e.preventDefault()

        if(file === null){
            alert("파일을 업로드해주세요")
            return
        }
        // formData 추가
        const formData = new FormData();
        formData.append('file', file)

        try{
            const response = await axiosInstance.post("/admin/uploadExcel", formData, {
                "headers" : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            console.log(response)
        }catch(error){
            alert("파일 업로드에 실패하였습니다.")
        }

    }

    return (
        <div>
            <form onChange={handleFileChange} onSubmit={fileUpload}>
                <label htmlFor="uploadExcel"> 엑셀 파일 업로드</label>
                <input type="file" name="uploadExcel" accept=".xlsx"/>
                <button>업로드</button>
            </form>
        </div>

    )
}

export default AdminFileUpload;