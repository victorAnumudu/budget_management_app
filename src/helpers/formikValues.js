import * as Yup from "yup";

export let addPVFields = {
  date_captured: "",
  pv_number: "",
  budget_type: '',
  approval_authority: '',
  economic_code: '',
  beneficiary_mda: '',
  economic_description: '',
  pv_description: '',
  beneficiary_name: '',
  beneficiary_bank: '',
  beneficiary_account: '',
  gross_amount: '',
  net_amount: ''
};

export let addPVFieldsValidation = Yup.object().shape({
  date_captured: Yup.date().required("Select Date"),
  pv_number: Yup.string().required("Required"),
  budget_type: Yup.string().required("Required"),
  approval_authority: Yup.string().required("Required"),
  economic_code: Yup.string().required("Required"),
  beneficiary_mda: Yup.string().required("Required"),
  economic_description: Yup.string().required("Required"),
  pv_description: Yup.string().required("Required"),
  beneficiary_name: Yup.string().required("Required"),
  beneficiary_bank: Yup.string().required("Required"),
  beneficiary_account: Yup.string().required("Required"),
  gross_amount: Yup.string().required("Required").test('is-decimal', 'Invalid Number', value => (value + "").match(/^\d+(\.\d{0,5})?$/)),
  // net_amount: Yup.string().required("Required").test('is-decimal', 'Invalid Number', value => (value + "").match(/^\d+(\.\d{0,5})?$/)),
  net_amount: Yup.number().required('Required').typeError('not a number').min(0, "Net amount cannot be negative").max(
      Yup.ref("gross_amount"),
      "Net amount cannot be greater than gross amount"
    )
});

export let addMDAFields = {
  org_code: '',
  mda_name: '',
  year: '',
};

export let addMDAFieldsValidation = Yup.object().shape({
  org_code: Yup.string().required("Required").max(8, 'Must not exceed 8 characters'),
  mda_name: Yup.string().required("Required"),
  year: Yup.string().required("Required"),
});

export let addUserFields = {
  firstname: '',
  lastname: '',
  role: '',
  status: '',
  email: ''
};

export let addUserFieldsValidation = Yup.object().shape({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  // role: Yup.string().required("Required"),
  // status: Yup.string().required("Required"),
});



// FOR ECONOMIC ITEM
export let addEconomicItemFields = {
  org_code: '', 
  economic_code: '',
  mda: '', 
  budget_type: '', 
  economic_description: '', 
  initial_budget: '', 
  vired_frm: '', 
  vired_to: '', 
  supplementary_budget: '', 
  // actual_expenses: '', 
  // total_budget: '', 
  // balance: '',
  year: ''
};

export let addEconomicItemFieldsValidation = Yup.object().shape({
  org_code: Yup.string().required("Required"), 
  economic_code: Yup.string().required("Required"),
  mda: Yup.string().required("Required"), 
  budget_type: Yup.string().required("Required"), 
  economic_description: Yup.string().required("Required"), 
  initial_budget: Yup.string().required("Required").test('is-decimal', 'Invalid Number', value => (value + "").match(/^\d+(\.\d{0,5})?$/)), 
  vired_frm: Yup.string().required("Required").test('is-decimal', 'Invalid Number', value => (value + "").match(/^\d+(\.\d{0,5})?$/)), 
  vired_to: Yup.string().required("Required").test('is-decimal', 'Invalid Number', value => (value + "").match(/^\d+(\.\d{0,5})?$/)), 
  supplementary_budget: Yup.string().required("Required").test('is-decimal', 'Invalid Number', value => (value + "").match(/^\d+(\.\d{0,5})?$/)), 
  // actual_expenses: Yup.string().required("Required").test('is-decimal', 'Invalid Number', value => (value + "").match(/^\d+(\.\d{0,5})?$/)), 
  // total_budget: Yup.string().required("Required").test('is-decimal', 'Invalid Number', value => (value + "").match(/^\d+(\.\d{0,5})?$/)), 
  // balance: Yup.string().required("Required").test('is-decimal', 'Invalid Number', value => (value + "").match(/^\d+(\.\d{0,5})?$/)),
  year: Yup.date().required("Required"),
});