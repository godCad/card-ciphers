import { useState } from "react";
import Modal from "../../../components/Modal";
import styles from '../../admin/AdminDashboard.module.css'

interface Props{
    amount: string
}
export default function FailedModal({amount}: Props) {

    const [modalState, setModalState] = useState(true)

    return (
      <Modal
        open={modalState}
        onClose={()=> setModalState(false)}
        title= "Invalid Card"
      >
        <div>
        <p className={styles.modalText}>The card is invalid, kindly input a valid card</p>
        <span className={styles.title}>${amount}</span>
        </div>

      </Modal>
    );
  }