import { useAddress } from "../context/address-context";
import { useState, useEffect, useRef } from "react";
import "../styles/components/editAddressModal.css";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

export const EditAddressModal = () => {
  const { addressState, dispatchAddress } = useAddress();
  const editAddressModal = useRef(null);

  const initialAddressState = {
    id: "",
    name: "",
    flatName: "",
    area: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "Maharashtra",
    country: "India",
    contact: "",
  };

  const [formData, setFormData] = useState(initialAddressState);

  useEffect(() => {
    if (addressState.isEditing) {
      setFormData(addressState.editData);
    } else {
      setFormData(initialAddressState);
    }
  }, [addressState.isEditing, addressState.editData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalOnSubmit = (e) => {
    e.preventDefault();
    const updatedAddressData = {
      ...formData,
      id: addressState.isEditing ? formData.id : uuid(),
    };

    if (addressState.isEditing) {
      dispatchAddress({ type: "UPDATE-EDIT-ADDRESS", payload: updatedAddressData });
      toast.success("Address Updated!");
    } else {
      dispatchAddress({ type: "ADD-NEW-ADDRESS", payload: updatedAddressData });
      toast.success("Added New Address");
    }

    closeModal();
  };

  const fillDummyAddressForm = (e) => {
    e.preventDefault();
    setFormData({
      name: "Ramesh Sharma",
      flatName: "A/201, Govardhan Complex",
      area: "Azad Nagar, Andheri-West",
      landmark: "Near Azad Nagar Metro Station",
      city: "Mumbai",
      pincode: "400063",
      state: "Maharashtra",
      country: "India",
      contact: "8899887788",
    });
  };

  const closeModal = () => {
    dispatchAddress({ type: "TOGGLE-ADDRESS-MODAL", payload: "hide-edit-box" });
    dispatchAddress({ type: "SET-EDIT-STATUS", payload: false });
    setFormData(initialAddressState);
  };

  return (
    <div className={`edit-address-background ${addressState.setEditBox}`}>
      <form
        ref={editAddressModal}
        className="edit-address-container pd-xsm flex-column"
        onSubmit={handleModalOnSubmit}
      >
        <h2 className="text-center">Address</h2>
        <button className="btn btn-solid btn-fill-dummy-address" onClick={fillDummyAddressForm}>
          Fill Dummy Data
        </button>

        <div className="top-section flex-column">
          <label className="mg-y-xsm fs-sm">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

          <label className="mg-y-xsm fs-sm">Contact Number (10 Digits Only)</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            pattern="^[0-9]{10}$"
            required
          />

          <label className="mg-y-xsm fs-sm">Flat, House no., Building</label>
          <input type="text" name="flatName" value={formData.flatName} onChange={handleInputChange} required />

          <label className="mg-y-xsm fs-sm">Area, Colony, Street, Sector</label>
          <input type="text" name="area" value={formData.area} onChange={handleInputChange} required />

          <label className="mg-y-xsm fs-sm">Landmark</label>
          <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} required />

          <label className="mg-y-xsm fs-sm">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />

          <label className="mg-y-xsm fs-sm">Pincode (6 Digits Only)</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            pattern="([0-9]{6}|[0-9]{3}\s[0-9]{3})"
            required
          />

          <label className="mg-y-xsm fs-sm">State</label>
          <select name="state" value={formData.state} onChange={handleInputChange}>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
          </select>

          <label className="mg-y-xsm fs-sm">Country</label>
          <select name="country" value={formData.country} onChange={handleInputChange}>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Nepal">Nepal</option>
          </select>
        </div>

        <div className="bottom-section align-center">
          <div className="action-buttons align-center">
            <button className="btn btn-solid" type="submit">
              Save Address
            </button>
            <button className="btn btn-outline" type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
