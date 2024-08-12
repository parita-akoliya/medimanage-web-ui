import React, { Component } from 'react';
import { Table, Button, Modal, Form, Row, Col, Container, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { PencilSquare, Trash, Plus } from 'react-bootstrap-icons';
import {
    createCategoryRequest,
    deleteCategoryRequest,
    getCategoriesRequest,
    updateCategoryRequest,
    createLookupRequest,
    deleteLookupRequest,
    getLookupsRequest,
    updateLookupRequest
} from '../../../store/actions/lookupActions';

interface Category {
    _id: string;
    name: string;
}

interface Lookup {
    _id: string;
    type: { _id: string; name: string };
    value: string;
    parentId?: { _id: string; value: string };
}

interface DataManagementProps {
    categories: Category[];
    lookupsAll: Lookup[];
    createCategory: (data: any, onCallSuccess?: Function) => void;
    deleteCategory: (id: string, onCallSuccess?: Function) => void;
    getCategories: () => void;
    updateCategory: (id: string, data: any, onCallSuccess?: Function) => void;
    createLookup: (data: any, onCallSuccess?: Function) => void;
    deleteLookup: (id: string, onCallSuccess?: Function) => void;
    getLookups: () => void;
    updateLookup: (id: string, data: any, onCallSuccess?: Function) => void;
}

interface DataManagementState {
    modalIsOpen: boolean;
    deleteModalIsOpen: boolean;
    modalType: 'category' | 'lookup';
    formData: { id?: string; name?: string; type?: string; value?: string; parentId?: string };
    filterTextCategory: string;
    filterTextLookup: string;
    isEditing: boolean;
    editIndex: number | null;
    deleteIndex: number | null;
    deleteType: 'category' | 'lookup' | null;
}

class DataManagement extends Component<DataManagementProps, DataManagementState> {
    constructor(props: DataManagementProps) {
        super(props);
        this.state = {
            modalIsOpen: false,
            deleteModalIsOpen: false,
            modalType: 'category',
            formData: {},
            filterTextCategory: '',
            filterTextLookup: '',
            isEditing: false,
            editIndex: null,
            deleteIndex: null,
            deleteType: null,
        };
    }

    componentDidMount() {
        this.props.getCategories();
        this.props.getLookups();
    }

    componentDidUpdate(prevProps: DataManagementProps) {
        if (prevProps.categories !== this.props.categories || prevProps.lookupsAll !== this.props.lookupsAll) {
            this.setState((prevState) => ({
                formData: this.state.modalType === 'category'
                    ? (prevState.editIndex !== null ? { ...this.props.categories[prevState.editIndex] } : {})
                    : (prevState.editIndex !== null ? { ...this.props.lookupsAll[prevState.editIndex] } : {})
            }));
        }
    }

    openModal = (type: 'category' | 'lookup', isEditing: boolean = false, index: number | null = null) => {
        this.setState({
            modalIsOpen: true,
            modalType: type,
            isEditing,
            editIndex: index,
            formData: type === 'category'
                ? { name: isEditing && index !== null ? this.props.categories[index]?.name : '' }
                : {
                    type: isEditing && index !== null ? this.props.lookupsAll[index]?.type._id : '',
                    value: isEditing && index !== null ? this.props.lookupsAll[index]?.value : '',
                    parentId: isEditing && index !== null ? this.props.lookupsAll[index]?.parentId?._id : ''
                }
        });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    openDeleteModal = (type: 'category' | 'lookup', index: number | null) => {
        this.setState({
            deleteModalIsOpen: true,
            deleteIndex: index,
            deleteType: type
        });
    };

    closeDeleteModal = () => {
        this.setState({ deleteModalIsOpen: false });
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: { ...prevState.formData, [name]: value },
        }));
    };

    handleSelectChange = (e: any) => {
        this.setState((prevState) => ({
            formData: { ...prevState.formData, [e.target.name]: e.target.value },
        }));
    };

    handleAddOrUpdateData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { formData, isEditing, editIndex, modalType } = this.state;
        if (modalType === 'category') {
            if (isEditing && editIndex !== null) {
                const id = this.props.categories[editIndex]?._id;
                if (id) this.props.updateCategory(id, formData, () => {
                    this.props.getCategories()
                    this.props.getLookups()
                });
            } else {
                this.props.createCategory(formData, () => {
                    this.props.getCategories()
                });
            }
        } else {
            if (isEditing && editIndex !== null) {
                const id = this.props.lookupsAll[editIndex]?._id;
                if (id) this.props.updateLookup(id, formData, () => {
                    this.props.getLookups()
                });
            } else {
                this.props.createLookup(formData, () => {
                    this.props.getLookups()
                });
            }
        }
        this.setState({
            formData: modalType === 'category' ? { name: '' } : { type: '', value: '', parentId: '' },
            modalIsOpen: false,
        });
    };

    handleDelete = () => {
        const { deleteIndex, deleteType } = this.state;
        if (deleteType && deleteIndex !== null) {
            if (deleteType === 'category') {
                const id = this.props.categories[deleteIndex]?._id;
                if (id) this.props.deleteCategory(id, () => {                    
                    this.props.getCategories();
                    this.props.getLookups();
                });
            } else {
                const id = this.props.lookupsAll[deleteIndex]?._id;
                if (id) this.props.deleteLookup(id, () => {
                    this.props.getLookups();
                });
            }
        }
        this.setState({ deleteModalIsOpen: false });
    };

    handleFilterChange = (e: any, type: 'category' | 'lookup') => {
        if (type === 'category') {
            this.setState({ filterTextCategory: e.target.value });
        } else {
            this.setState({ filterTextLookup: e.target.value });
        }
    };

    render() {
        const { modalIsOpen, deleteModalIsOpen, formData, filterTextCategory, filterTextLookup, isEditing, modalType, deleteType } = this.state;
        const { categories, lookupsAll } = this.props;

        const filteredCategories = categories?.filter((item) =>
            item.name.toLowerCase().includes(filterTextCategory.toLowerCase())
        );
        const filteredLookups = lookupsAll?.filter((item) =>
            item.value.toLowerCase().includes(filterTextLookup.toLowerCase())
        );

        const noCategories = categories.length === 0;
        const noLookups = lookupsAll?.length === 0;

        return (
            <Container>
                <h2 className="my-4">Data Management</h2>

                <Tabs defaultActiveKey="categories" id="data-management-tabs">
                    <Tab eventKey="categories" title="Categories">
                        <Row style={{ paddingTop: '1%' }}>
                            <Col xs={8}>
                                <Form.Control
                                    type="text"
                                    placeholder="Filter Categories..."
                                    value={filterTextCategory}
                                    onChange={(e) => this.handleFilterChange(e, 'category')}
                                />
                            </Col>
                            <Col xs={4}>
                                <Button variant="primary" onClick={() => this.openModal('category')}>
                                    <Plus /> Add Category
                                </Button>
                            </Col>
                        </Row>
                        {noCategories ? (
                            <div>No data found</div>
                        ) : (
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.map((item, index) => (
                                        <tr key={item._id || index}>
                                            <td>{item.name}</td>
                                            <td>
                                                <Button
                                                    variant="link"
                                                    onClick={() => this.openModal('category', true, index)}
                                                >
                                                    <PencilSquare />
                                                </Button>
                                                <Button
                                                    variant="link"
                                                    onClick={() => this.openDeleteModal('category', index)}
                                                >
                                                    <Trash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Tab>
                    {
                        (!noCategories) && (
                            <Tab eventKey="lookups" title="Lookups">
                                <Row style={{ paddingTop: '1%' }}>
                                    <Col xs={8}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Filter Lookups..."
                                            value={filterTextLookup}
                                            onChange={(e) => this.handleFilterChange(e, 'lookup')}
                                        />
                                    </Col>
                                    <Col xs={4}>
                                        <Button variant="primary" onClick={() => this.openModal('lookup')}>
                                            <Plus /> Add Lookup
                                        </Button>
                                    </Col>
                                </Row>
                                {noLookups ? (
                                    <div>No data found</div>
                                ) : (
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Value</th>
                                                <th>Parent</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredLookups?.map((item, index) => (
                                                <tr key={item._id || index}>
                                                    <td>{item.type.name}</td>
                                                    <td>{item.value}</td>
                                                    <td>{item?.parentId?.value || 'NA'}</td>
                                                    <td>
                                                        <Button
                                                            variant="link"
                                                            onClick={() => this.openModal('lookup', true, index)}
                                                        >
                                                            <PencilSquare />
                                                        </Button>
                                                        <Button
                                                            variant="link"
                                                            onClick={() => this.openDeleteModal('lookup', index)}
                                                        >
                                                            <Trash />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Tab>
                        )
                    }
                </Tabs>
                <Modal show={modalIsOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Edit' : 'Add'} {modalType === 'category' ? 'Category' : 'Lookup'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleAddOrUpdateData}>
                            {modalType === 'category' ? (
                                <Form.Group controlId="formCategoryName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            ) : (
                                <>
                                    <Form.Group controlId="formLookupType">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="type"
                                            value={formData.type || ''}
                                            onChange={this.handleSelectChange}
                                            required
                                        >
                                            <option value="">Select Type</option>
                                            {this.props.categories.map((category) => (
                                                <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formLookupValue">
                                        <Form.Label>Value</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="value"
                                            value={formData.value || ''}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formLookupParentId">
                                        <Form.Label>Parent ID</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="parentId"
                                            value={formData.parentId || ''}
                                            onChange={this.handleSelectChange}
                                        >
                                            <option value="">Select Parent</option>
                                            {this.props.lookupsAll.map((lookup) => (
                                                <option key={lookup._id} value={lookup._id}>
                                                    {lookup.value}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </>
                            )}
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Modal show={deleteModalIsOpen} onHide={this.closeDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this {deleteType === 'category' ? 'category' : 'lookup'}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeDeleteModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => ({
    categories: state?.lookupData?.categories,
    lookupsAll: state?.lookupData?.lookupsAll
});

const mapDispatchToProps = {
    createCategory: createCategoryRequest,
    deleteCategory: deleteCategoryRequest,
    getCategories: getCategoriesRequest,
    updateCategory: updateCategoryRequest,
    createLookup: createLookupRequest,
    deleteLookup: deleteLookupRequest,
    getLookups: getLookupsRequest,
    updateLookup: updateLookupRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(DataManagement);
