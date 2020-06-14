import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmModal = (props) => {
  const { className, show, title, content, answer } = props;

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
            color="primary"
            onClick={(e) => {
              toggle();
              answer('confirm');
            }}
          >
            valider
          </Button>{' '}
          <Button
            onClick={(e) => {
              answer('cancel');
              toggle();
            }}
            color="secondary"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
