import React, { useContext } from "react";
import ToastContext from "../../contexts/ToastContext";

const ReleaseTagsPage = (): JSX.Element => {
    const { notify } = useContext(ToastContext);

    const handleFormSubmit = async (event: any): Promise<void> => {
        event.preventDefault();
        const content: string = event?.target[0]?.value || "";
        const convertedText = content
            .trim()
            .replace(/\s-\s|-\s/g, "")
            .replace(/\n|\r/g, " ");
        const result: string = `npm install --save-exact ${convertedText}`;
        try {
            await navigator.clipboard.writeText(result);
            console.log("Copy success");
        } catch (err) {
            console.error(err);
        }
    };

    // const onClick = () => notify("Helloo");

    return (
        <div className="d-flex justify-content-center">
            <div className="w-75 m-3">
                <div className="card mt-2">
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label className="form-label">
                                    Paste your release tags version
                                </label>
                                <textarea
                                    className="form-control"
                                    rows={15}
                                ></textarea>
                            </div>
                            <button
                                className="btn btn-success float-end"
                                type="submit"
                            >
                                Copy to clipboard
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReleaseTagsPage;
