import "./DeleteGameModal.styles.css";

type Props = {
    onCancelButton: () => void;
    onDeleteButton: () => void;
}
const DeleteGameModal = (props: Props) => {
    const {onCancelButton, onDeleteButton} = props;
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <i className="far fa-trash-alt"></i>
                    <div className="modal-title">Confirm Delete</div>
                    <div className="modal-body">Are you sure you want to delete this item?</div>
                    <div className="modal-buttons">
                        <button className="modal-button modal-button-cancel" onClick={onCancelButton}>Cancel</button>
                        <button className="modal-button modal-button-delete" onClick={onDeleteButton}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteGameModal;