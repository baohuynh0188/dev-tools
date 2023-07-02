import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ModifierPage = () => {
    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        // setBlog({ ...newBlog, "content": data });
    };

    function uploadPlugin(editor: any) {
        editor.plugins.get("FileRepository").createUploadAdapter = (
            loader: any
        ) => {
            return uploadAdapter(loader);
        };
    }

    function uploadAdapter(loader: any) {
        console.log(loader);

        // return {
        //     upload: () => {
        //         return new Promise((resolve, reject) => {
        //             loader.file.then((file) => {
        //                 console.log("file>>>", file);
        //                 let formData = new FormData();
        //                 formData.append("url", file);
        //                 formData.append("name", 72);
        //                 formData.append("url1", "test body");
        //                 console.log("body>>>", formData);
        //                 for (var key of formData.entries()) {
        //                     console.log(key[0] + ', ' + key[1]);
        //                 }
        //                 FilesService.upload(formData).then((response) => {
        //                     console.log(response);
        //                     resolve({
        //                         default: `${process.env.REACT_APP_API}/${response.data.url}`
        //                     });
        //                 })
        //                     .catch((err) => {
        //                         reject(err);
        //                         console.log(err);
        //                     });
        //             });
        //         });
        //     }
        // };
    }

    return (
        <div className="col-12">
            <h1 className="mb-3">Create post</h1>
            <div className="row mb-3">
                <div className="col-9">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        minLength={1}
                        required
                    />
                </div>
                <div className="col-3">
                    <label htmlFor="topic" className="form-label">
                        Topic
                    </label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="topic"
                        name="topic"
                    >
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                    }}
                />
            </div>
        </div>
    );
};

export default ModifierPage;
