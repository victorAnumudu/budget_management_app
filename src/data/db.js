const MDAs = [
    {id: '', org_code: '', mda_name: '', approval_authorities: ['Governor', 'Commissioner', 'Accountant General', 'Audit Clearance', 'Chief of Staff', 'SSG']}
]
const ECONOMIC_LINE = [
    {
        id: '', 
        org_code: '', 
        economic_code: '',
        mda: '', 
        budget_type: '', 
        economic_description: '', 
        initial_budget: '', 
        vired_frm: '', 
        vired_to: '', 
        supplementary_budget: '', 
        actual_expenses: '', 
        total_budget: '', 
        balance: '',
        year: ''
    }
]

const EXPENSES = [
    {
        id: '',
        date_captured: '',
        org_code: '',
        economic_code: '',
        economic_description: '',
        beneficiary_mda: '',
        pv_description: '',
        beneficiary_name: '',
        beneficiary_account: '',
        beneficiary_bank: '',
        pv_number: '',
        gross_amount: '',
        net_amount: '',
        // bank_to_debit: '',
        budget_type: '',
        approval_authority: '',
        captured_by: ''
    }
]


const history = [
    {
        id: '',
        date_captured: '',
        description: '',
        done_by: ''
    }
]