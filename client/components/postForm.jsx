import React from 'react';
import ReactModal from 'react-modal';

class PostForm extends React.Component {
  // using react-modal library. Provides some standard functions like 'onRequestClose'
  // which allows you to close the modal by clicking in the overlay and simple styling options
  // for both the modal and overlay.

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <div onClick={this.props.handleOpenModal}>{this.props.string}</div>
        <ReactModal
          isOpen={this.props.showModal}
          contentLabel="Test"
          onRequestClose={this.props.handleCloseModal}
        >
          <div>
            <svg
              viewBox="0 0 24 24"
              role="img"
              aria-label="Close"
              focusable="false"
              id="sumarymodule_contact_close"
              onClick={this.props.handleCloseModal}
            >
              <path
                d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
                fillRule="evenodd"
              />
            </svg>
            <div>
              <div>
                <form>
                  <label>
                    New Price:
                    <input type="text" name="name" />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default PostForm;
