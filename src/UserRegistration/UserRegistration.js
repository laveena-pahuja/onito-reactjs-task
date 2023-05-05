import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addUser } from "../service/api";

const schema = yup.object().shape(
  {
    name: yup.string().required("Name is required"),
    age: yup
      .number()
      .positive("Age must be a positive number")
      .integer("Age must be an integer")
      .required("Age is required"),
    sex: yup
      .string()
      .oneOf(["male", "female"], "Please select a valid option")
      .required("Sex is required"),
    mobile: yup.string().when("mobile", {
      is: (val) => val?.length > 0,
      then: (schema) => schema.matches(/^[6-9]\d{9}$/, "Invalid mobile number"),
      otherwise: (schema) => schema.notRequired(),
    }),
    govtIdType: yup.string().notRequired(),
    govIdNumber: yup.string().when('govtIdType', {
      is: (govtIdType) => govtIdType && govtIdType === 'aadhaar_card',
      then: (schema) => schema.matches(/^\d{12}$/, 'Govt ID should be a valid 12-digit numeric string'),
      otherwise: () => yup.string().when('govtIdType', {
        is: (govtIdType) => govtIdType && govtIdType === 'pan_card',
        then: () => yup.string().matches(/^[A-Z]{5}\d{4}[A-Z]{1}$/, 'Govt ID should be a valid 10-digit alpha-numeric string'),
        otherwise: () => yup.string().notRequired()
      })
    }).nullable(),
    email: yup.string().notRequired(),
    emergencyContactNumber: yup.string().when("emergencyContactNumber", {
      is: (val) => val?.length > 0,
      then: (schema) => schema.matches(/^[6-9]\d{9}$/, "Invalid mobile number"),
      otherwise: (schema) => schema.notRequired(),
    }),
  },
  [
    ["mobile", "mobile"],
    ["emergencyContactNumber", "emergencyContactNumber"],
    ["govIdNumber", "govIdNumber"],
  ]
);
const options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const idTypes = [
  { label: "Aadhaar Card", value: "aadhaar_card" },
  { label: "PAN Card", value: "pan_card" },
];

const countries = [
  { value: "USA", label: "USA" },
  { value: "Canada", label: "Canada" },
  { value: "Mexico", label: "Mexico" },
];

const cities = [
  { value: "New York", label: "New York" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "Toronto", label: "Toronto" },
  { value: "Vancouver", label: "Vancouver" },
  { value: "Mexico City", label: "Mexico City" },
];
const nationalities = [
  { value: "indian", label: "Indian" },
  { value: "american", label: "American" },
  { value: "british", label: "British" },
  { value: "australian", label: "Australian" },
  { value: "canadian", label: "Canadian" },
  { value: "chinese", label: "Chinese" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "korean", label: "Korean" },
  { value: "mexican", label: "Mexican" },
  { value: "russian", label: "Russian" },
  { value: "spanish", label: "Spanish" },
  { value: "swedish", label: "Swedish" },
  { value: "swiss", label: "Swiss" },
];
const religionOptions = [
  { label: "Hinduism", value: "Hinduism" },
  { label: "Islam", value: "Islam" },
  { label: "Christianity", value: "Christianity" },
  { label: "Buddhism", value: "Buddhism" },
  { label: "Sikhism", value: "Sikhism" },
  { label: "Jainism", value: "Jainism" },
  { label: "Zoroastrianism", value: "Zoroastrianism" },
  { label: "Other", value: "Other" },
];

const maritalStatus = [
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
];
const bloodGroups = [
  { label: "A+", value: "a_positive" },
  { label: "A-", value: "a_negative" },
  { label: "B+", value: "b_positive" },
  { label: "B-", value: "b_negative" },
  { label: "AB+", value: "ab_positive" },
  { label: "AB-", value: "ab_negative" },
  { label: "O+", value: "o_positive" },
  { label: "O-", value: "o_negative" },
];
const UserRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      age: "",
      sex: "",
      mobile: "",
      govtIdType: "",
      govIdNumber: "",
      guardianName: "",
      email: "",
      emergencyContactNumber: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      religion: "",
      maritalStatus: "",
      bloodGroup: "",
      nationality: "",
    },
  });

  const onSubmit = (data) => {
    const addUserDetails = async () => {
      await addUser(data);
      return reset();

    };
    addUserDetails();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>
        <u>Personal Details</u>
      </h3>
      <div className="row mb-5">
        <div className="col-md-4">
          <div className="row">
            <label className="col-sm-1 col-form-label">Name:</label>

            <div className="col-sm-11">
              <input
                type="text"
                name="name"
                className="form-control"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-danger">This field is required</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-sm-1 col-form-label">Age:</label>
            <div className="col-sm-11">
              <input
                className="form-control"
                type="number"
                name="age"
                {...register("age", { required: true })}
              />
              {errors.age && (
                <p className="text-danger">This field is required</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-sm-1 col-form-label">Sex:</label>
            <div className="col-sm-11">
              <select className="form-select" name="sex" {...register("sex")}>
                {/* <option disabled selected value='sex'>Enter Sex</option> */}
                {options.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.label}
                  </option>
                ))}
              </select>
              {errors.sex && (
                <p className="text-danger">This field is required</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <div className="row">
            <label className="col-auto col-form-label pe-0">Mobile: </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="mob"
                name="mobile"
                {...register("mobile")}
              />
              {errors.mobile && (
                <p className="text-danger">
                  Please enter a valid mobile number
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <label className="col-sm-2 col-form-label">
              Govt Issued Id Type:
            </label>

            <div className="col-sm-3">
              <select
                className="form-select"
                name="govtIdType"
                {...register("govtIdType")}
              >
                {idTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-7">
              <input
                className="form-control"
                type="text"
                placeholder="Enter Govt ID"
                name="govIdNumber"
                {...register("govIdNumber")}
              />
              {errors.govIdNumber && <p className="text-danger">{errors?.govIdNumber?.message}</p>}
            </div>
          </div>
        </div>
      </div>

      <h3>
        <u>Contact Details</u>
      </h3>
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="row">
            <label className="col-auto col-form-label">Guardian Details:</label>
            <div className="col-sm-3">
              <select
                className="form-select"
                name="guardianName"
                {...register("guardianName")}
              >
                <option value="">Select Label</option>
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-sm-6">
              <input
                className="form-control"
                type="text"
                placeholder="Enter Guardian Name"
                name="guardianName"
                {...register("guardianName")}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-sm-1 col-form-label">Email:</label>
            <div className="col-sm-11">
              <input
                className="form-control"
                type="email"
                name="email"
                {...register("email")}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-sm-4 col-form-label">
              Emergency Contact Number:
            </label>
            <div className="col-sm-8">
              <input
                className="form-control"
                type="text"
                name="emergencyContactNumber"
                {...register("emergencyContactNumber")}
              />
              {errors.emergencyContactNumber && (
                <p className="text-danger">
                  Please enter a valid mobile number
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <h3>
        <u>Address Details</u>
      </h3>
      <div className="row gy-5">
        <div className="col-md-4">
          <div className="row">
            <label className="col-auto col-form-label">Address:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                name="address"
                {...register("address")}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-sm-1 col-form-label">State:</label>
            <div className="col-sm-11">
              <select
                name="state"
                className="form-select"
                {...register("state")}
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-sm-1 col-form-label">City:</label>
            <div className="col-sm-11">
              <select name="city" className="form-select"  {...register("city")}>
                {cities.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-auto col-form-label">Country:</label>
            <div className="col-sm-10">
              <select name="country" className="form-select" {...register("country")}>
                {countries.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-sm-2 col-form-label">Pincode:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                placeholder="Enter Pincode"
                name="pincode"
                {...register("pincode")}
              />
            </div>
          </div>
        </div>
      </div>
      <h3>
        <u>Other Details</u>
      </h3>
      <div className="row gy-5 mb-5">
        <div className="col-md-4">
          <div className="row">
            <label className="col-sm-2 col-form-label">Occupation:</label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                name="occupation"
                {...register("occupation")}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-sm-2 col-form-label">Religion:</label>
            <div className="col-sm-10">
              <select name="religion" className="form-select" {...register("religion")}>
                {religionOptions.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-sm-3 col-form-label">Marital Status:</label>
            <div className="col-sm-9">
              <select name="maritalStatus" className="form-select" {...register("maritalStatus")}>
                {maritalStatus.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-auto col-form-label">Blood Group:</label>
            <div className="col-sm-9">
              <select name="bloodGroup" className="form-select" {...register("bloodGroup")}>
                {bloodGroups.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <label className="col-auto col-form-label">Nationality:</label>
            <div className="col-sm-9">
              <select name="nationality" className="form-select" {...register("nationality")}>
                {nationalities.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row text-end">
        <div className="col-12">
          <button className="btn btn-outline-danger me-3"   onClick={() => reset()}>Cancel</button>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserRegistrationForm;
