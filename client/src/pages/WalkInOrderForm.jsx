// import { useState } from "react";
// import { useCreateWalkInOrderMutation } from "../slices/orderSlice.js";
// import { toast } from "react-toastify";

// const WalkInOrderForm = () => {
//   const [createWalkInOrder] = useCreateWalkInOrderMutation();

//   const [formData, setFormData] = useState({
//     customerName: "",
//     phone: "",
//     jobType: "",
//     jobDetails: "",
//     amount: "",
//     deliveryDate: "",
//     orderType: "design",
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const validateField = (name, value) => {
//     switch (name) {
//       case "customerName":
//         if (!value.trim()) return "Customer name is required.";
//         break;
//       case "phone":
//         if (!value.trim()) return "Phone number is required.";
//         if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits.";
//         break;
//       case "jobType":
//         if (!value.trim()) return "Job type is required.";
//         break;
//       case "jobDetails":
//         if (!value.trim()) return "Job details are required.";
//         break;
//       case "amount":
//         if (!value.trim()) return "Amount is required.";
//         if (isNaN(value) || parseFloat(value) <= 0) return "Amount must be a positive number.";
//         break;
//       case "deliveryDate":
//         if (!value) return "Delivery date is required.";
//         const today = new Date();
//         const selected = new Date(value);
//         if (selected < new Date(today.setHours(0, 0, 0, 0))) return "Delivery date cannot be in the past.";
//         break;
//       default:
//         return null;
//     }
//     return null;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({ ...formData, [name]: value });

//     if (touched[name]) {
//       const error = validateField(name, value);
//       setErrors({ ...errors, [name]: error });
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched({ ...touched, [name]: true });
//     const error = validateField(name, value);
//     setErrors({ ...errors, [name]: error });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Final validation before submission
//     const newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       const error = validateField(key, formData[key]);
//       if (error) newErrors[key] = error;
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setTouched({
//         customerName: true,
//         phone: true,
//         jobType: true,
//         jobDetails: true,
//         amount: true,
//         deliveryDate: true,
//       });
//       return;
//     }

//     try {
//       await createWalkInOrder(formData).unwrap();
//       toast.success("Order created successfully!");
//       setFormData({
//         customerName: "",
//         phone: "",
//         jobType: "",
//         jobDetails: "",
//         amount: "",
//         deliveryDate: "",
//         orderType: "design",
//       });
//       setErrors({});
//       setTouched({});
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.data?.message || "Failed to create order");
//     }
//   };

//   const renderError = (field) =>
//     touched[field] && errors[field] && (
//       <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
//     );

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
//       <h2 className="text-2xl font-semibold mb-6">Walk-In Customer Order</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/** Customer Name */}
//         <div>
//           <label className="block mb-1">Customer Name</label>
//           <input
//             type="text"
//             name="customerName"
//             value={formData.customerName}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//           {renderError("customerName")}
//         </div>

//         {/** Phone */}
//         <div>
//           <label className="block mb-1">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//           {renderError("phone")}
//         </div>

//         {/** Job Type */}
//         <div>
//           <label className="block mb-1">Job Type</label>
//           <input
//             type="text"
//             name="jobType"
//             value={formData.jobType}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//           {renderError("jobType")}
//         </div>

//         {/** Job Details */}
//         <div>
//           <label className="block mb-1">Job Details</label>
//           <textarea
//             name="jobDetails"
//             value={formData.jobDetails}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-2 rounded"
//           ></textarea>
//           {renderError("jobDetails")}
//         </div>

//         {/** Order Type */}
//         <div>
//           <label className="block mb-1">Order Type</label>
//           <select
//             name="orderType"
//             value={formData.orderType}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded"
//           >
//             <option value="design">Design Only</option>
//             <option value="design_print">Design + Print</option>
//             <option value="design_print_production">Design + Print + Production</option>
//           </select>
//         </div>

//         {/** Amount */}
//         <div>
//           <label className="block mb-1">Amount</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//           {renderError("amount")}
//         </div>

//         {/** Delivery Date */}
//         <div>
//           <label className="block mb-1">Delivery Date</label>
//           <input
//             type="date"
//             name="deliveryDate"
//             value={formData.deliveryDate}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//           {renderError("deliveryDate")}
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Submit Order
//         </button>
//       </form>
//     </div>
//   );
// };

// export default WalkInOrderForm;


// import { useState } from "react";
// import { useCreateOrderMutation } from "../slices/orderSlice.js";
// import { toast } from "react-toastify";

// const WalkInOrderForm = () => {
//   const [CreateOrder] = useCreateOrderMutation();

//   const [formData, setFormData] = useState({
//     customerName: "",
//     phone: "",
//     jobType: "",
//     jobDetails: "",
//     amount: "",
//     deliveryDate: "",
//     orderType: "design",
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const validateField = (name, value) => {
//     switch (name) {
//       case "customerName":
//         if (!value.trim()) return "Customer name is required.";
//         break;
//       case "phone":
//         if (!value.trim()) return "Phone number is required.";
//         if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits.";
//         break;
//       case "jobType":
//         if (!value.trim()) return "Job type is required.";
//         break;
//       case "jobDetails":
//         if (!value.trim()) return "Job details are required.";
//         break;
//       case "amount":
//         if (!value.trim()) return "Amount is required.";
//         if (isNaN(value) || parseFloat(value) <= 0) return "Amount must be a positive number.";
//         break;
//       case "deliveryDate":
//         if (!value) return "Delivery date is required.";
//         const today = new Date();
//         const selected = new Date(value);
//         if (selected < new Date(today.setHours(0, 0, 0, 0))) return "Delivery date cannot be in the past.";
//         break;
//       default:
//         return null;
//     }
//     return null;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (touched[name]) {
//       const error = validateField(name, value);
//       setErrors({ ...errors, [name]: error });
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched({ ...touched, [name]: true });
//     const error = validateField(name, value);
//     setErrors({ ...errors, [name]: error });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       const error = validateField(key, formData[key]);
//       if (error) newErrors[key] = error;
//     });

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setTouched({
//         customerName: true,
//         phone: true,
//         jobType: true,
//         jobDetails: true,
//         amount: true,
//         deliveryDate: true,
//       });
//       return;
//     }

//     try {
//       await CreateOrder(formData).unwrap();
//       toast.success("Order created successfully!");
//       setFormData({
//         customerName: "",
//         phone: "",
//         jobType: "",
//         jobDetails: "",
//         amount: "",
//         deliveryDate: "",
//         orderType: "design",
//       });
//       setErrors({});
//       setTouched({});
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.data?.message || "Failed to create order");
//     }
//   };

//   const renderError = (field) =>
//     touched[field] && errors[field] && (
//       <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
//     );

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl">
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
//         Walk-In Customer Order
//       </h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div>
//           <label className="block mb-1 font-medium">Customer Name</label>
//           <input
//             type="text"
//             name="customerName"
//             value={formData.customerName}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-2 rounded-lg"
//           />
//           {renderError("customerName")}
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-2 rounded-lg"
//           />
//           {renderError("phone")}
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Job Type</label>
//           <input
//             type="text"
//             name="jobType"
//             value={formData.jobType}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-2 rounded-lg"
//           />
//           {renderError("jobType")}
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Amount</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-2 rounded-lg"
//           />
//           {renderError("amount")}
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Delivery Date</label>
//           <input
//             type="date"
//             name="deliveryDate"
//             value={formData.deliveryDate}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-2 rounded-lg"
//           />
//           {renderError("deliveryDate")}
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Order Type</label>
//           <select
//             name="orderType"
//             value={formData.orderType}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded-lg"
//           >
//             <option value="design">Design Only</option>
//             <option value="design_print">Design + Print</option>
//             <option value="design_print_production">Design + Print + Production</option>
//           </select>
//         </div>

//         {/* Full-width Textarea */}
//         <div className="md:col-span-2">
//           <label className="block mb-1 font-medium">Job Details</label>
//           <textarea
//             name="jobDetails"
//             value={formData.jobDetails}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full border border-gray-300 p-3 rounded-lg h-28"
//           ></textarea>
//           {renderError("jobDetails")}
//         </div>

//         {/* Submit Button */}
//         <div className="md:col-span-2 text-center mt-4">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded-xl text-lg hover:bg-blue-700 transition"
//           >
//             Submit Order
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default WalkInOrderForm;


import { useState } from "react";
import { useCreateOrderMutation } from "../slices/orderSlice.js";
import { toast } from "react-toastify";

const WalkInOrderForm = () => {
  const [CreateOrder] = useCreateOrderMutation();

  const [formData, setFormData] = useState({
    walkInCustomer: {
      name: "",
      phone: "",
      email: "",
    },
    jobType: "",
    jobDetails: "",
    amount: "",
    deliveryDate: "",
    orderType: "design",
    specifications: {
      size: "",
      quantity: "",
      material: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "walkInCustomer.name":
        if (!value.trim()) return "Customer name is required.";
        break;
      case "walkInCustomer.phone":
        if (!value.trim()) return "Phone number is required.";
        if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits.";
        break;
      case "jobType":
        if (!value.trim()) return "Job type is required.";
        break;
      case "jobDetails":
        if (!value.trim()) return "Job details are required.";
        break;
      case "amount":
        if (!value.trim()) return "Amount is required.";
        if (isNaN(value) || parseFloat(value) <= 0) return "Amount must be a positive number.";
        break;
      case "deliveryDate":
        if (!value) return "Delivery date is required.";
        const today = new Date();
        const selected = new Date(value);
        if (selected < new Date(today.setHours(0, 0, 0, 0))) return "Delivery date cannot be in the past.";
        break;
      default:
        return null;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("walkInCustomer.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        walkInCustomer: {
          ...prev.walkInCustomer,
          [key]: value,
        },
      }));
    } else if (name.startsWith("specifications.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const fieldsToValidate = [
      "walkInCustomer.name",
      "walkInCustomer.phone",
      "jobType",
      "jobDetails",
      "amount",
      "deliveryDate",
    ];

    fieldsToValidate.forEach((field) => {
      const keys = field.split(".");
      let value = formData;
      for (let key of keys) value = value[key];
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(
        fieldsToValidate.reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      return;
    }

    try {
      await CreateOrder(formData).unwrap();
      toast.success("Order created successfully!");
      setFormData({
        walkInCustomer: {
          name: "",
          phone: "",
          email: "",
        },
        jobType: "",
        jobDetails: "",
        amount: "",
        deliveryDate: "",
        orderType: "design",
        specifications: {
          size: "",
          quantity: "",
          material: "",
        },
      });
      setErrors({});
      setTouched({});
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create order");
    }
  };

  const renderError = (field) =>
    touched[field] && errors[field] && (
      <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
        Walk-In Customer Order
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Name */}
        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            type="text"
            name="walkInCustomer.name"
            value={formData.walkInCustomer.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          {renderError("walkInCustomer.name")}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="walkInCustomer.phone"
            value={formData.walkInCustomer.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          {renderError("walkInCustomer.phone")}
        </div>

        {/* Email (optional) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="walkInCustomer.email"
            value={formData.walkInCustomer.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block mb-1 font-medium">Job Type</label>
          <input
            type="text"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          {renderError("jobType")}
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          {renderError("amount")}
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block mb-1 font-medium">Delivery Date</label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          {renderError("deliveryDate")}
        </div>

        {/* Order Type */}
        <div>
          <label className="block mb-1 font-medium">Order Type</label>
          <select
            name="orderType"
            value={formData.orderType}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="design">Design Only</option>
            <option value="design_print">Design + Print</option>
            <option value="design_print_production">Design + Print + Production</option>
          </select>
        </div>

        {/* Specifications */}
        <div>
          <label className="block mb-1 font-medium">Size</label>
          <input
            type="text"
            name="specifications.size"
            value={formData.specifications.size}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="specifications.quantity"
            value={formData.specifications.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Material</label>
          <input
            type="text"
            name="specifications.material"
            value={formData.specifications.material}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Job Details */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Job Details</label>
          <textarea
            name="jobDetails"
            value={formData.jobDetails}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 p-3 rounded-lg h-28"
          ></textarea>
          {renderError("jobDetails")}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl text-lg hover:bg-blue-700 transition"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default WalkInOrderForm;
