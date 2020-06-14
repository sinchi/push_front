import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmModal = (props) => {
  const {
    className,
    show,
    title,
    content,
    answer,
    cancelTextButton,
    confirmTextButton,
  } = props;

  const [modal, setModal] = useState(show);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal
        isOpen={modal}
        onClosed={(e) => answer('cancel')}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={(e) => {
              toggle();
              answer('confirm');
            }}
          >
            {confirmTextButton}
          </Button>{' '}
          <Button
            onClick={(e) => {
              answer('cancel');
              toggle();
            }}
            color="secondary"
          >
            {cancelTextButton}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
