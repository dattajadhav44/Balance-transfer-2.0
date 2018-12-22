pragma solidity ^0.4.24;

contract medicalRecords {
    
    struct Doctor{
        string doctorName;
        string doctorEmail;
        uint doctorContNum;
        string doctorLocalAddress;
        address doctorAddress;
        bool isDoctorRegistered;
    }
    
    struct Patient{
        string patientName;
        string patientEmail;
        uint patientContNum;
        string patientLocalAddress;
        string consultedDoctor;
        address patientAddress;
        bool isPatientExists;
    }
    
    address public OwnerOfHospital;
    address public receptionList;
    
    mapping(uint => Doctor) doctorInfo;
    mapping(uint => Patient) patientInfo;
    
    
    constructor(address _receptionList) public  {
        OwnerOfHospital = msg.sender;
        receptionList = _receptionList;
    }
    
    modifier onlyHospitalOwner {
        require(msg.sender == OwnerOfHospital, "Only Hospital owner can add the Doctor details into the record!");
        _;
    }
    
    modifier onlyReceptionist {
        require(msg.sender == receptionList, "Only Hospital receptionist can add the patient details into the record!");
        _;
    }
    
    function setDoctorDetails(uint _doctorId,
                              string memory _doctorName, 
                              string memory _doctorEmail, 
                              uint _doctorContNum,
                              string memory _doctorLocalAddress, 
                              address memory _doctorAddress)  public onlyHospitalOwner {
       
        Doctor storage tempvar = doctorInfo[_doctorId];
        
        tempvar.doctorName = _doctorName;
        tempvar.doctorEmail = _doctorEmail;
        tempvar.doctorContNum = _doctorContNum;
        tempvar.doctorLocalAddress = _doctorLocalAddress;
        tempvar.doctorAddress = _doctorAddress;
        tempvar.isDoctorRegistered = true;
    }
    
    function setPatientDetails(uint _pId, 
                               string memory _pName,
                               string memory _pEmail, 
                               uint _pContNum,
                               string memory _paddress,
                               string memory _consultedDoctor,
                               address memory _patientAddress)  public onlyReceptionist {
        
        Patient storage tempvar1 = patientInfo[_pId];
              
        tempvar1.patientName = _pName;
        tempvar1.patientEmail = _pEmail;
        tempvar1.patientContNum = _pContNum;
        tempvar1.patientLocalAddress = _paddress;
        tempvar1.consultedDoctor = _consultedDoctor;
        tempvar1.patientAddress = _patientAddress;
        tempvar1.isPatientExists = true;
    }
    
    function getDoctorDetails(uint _doctorId) view public  returns(string memory, 
                                                                   string memory,
                                                                   uint,
                                                                   string memory,
                                                                   address) {
        Doctor memory a = doctorInfo[_doctorId];
        require(a.isDoctorRegistered == true && msg.sender == a.doctorAddress, "Only Doctor can see his/her information");
        return (a.doctorName,
                a.doctorEmail,
                a.doctorContNum,
                a.doctorLocalAddress,
                a.doctorAddress
            );
    }
    
    function getPatientInfo(uint _pid) view public returns(string memory,
                                                           string memory,
                                                           uint, 
                                                           string memory,
                                                           string memory,
                                                           address) {
        Patient memory a = patientInfo[_pid];
        require(a.isPatientExists ==  true && msg.sender == a.patientAddress, "Only Patient can see his/her information");
        return (a.patientName,
                a.patientEmail,
                a.patientContNum,
                a.patientLocalAddress,
                a.consultedDoctor,
                a.patientAddress
            );
    }
}
