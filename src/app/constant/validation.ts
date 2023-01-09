export class Validate {
    // 1 letter 1 number
    public static readonly letter_number = "^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_ ]+$"
    //1 lowercase, 1 uppercase, 1 number
    public static readonly password = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,99}$"
    // letter not other
    public static readonly letter = "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_ ]+$"
    // number
    public static readonly number = "[0-9]+.{0}"
    // 
    public static readonly phone = "^[0-9]{9,11}$"
    // 
    public static readonly letter_num_exceptCSp = ""
    // 
    public static readonly decimal = "^([0-9]{1,10})(([,.]{1})([0-9]{1,2}))?$"
    // 
    public static readonly username = "^[0-9a-zA-z]+"
    // 
    public static readonly trimLetter_Num = "^((){0,1}([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+)( ){0,1}([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+))+"
    // 
    public static readonly trimRegex = "^[ ]*(.*?)[ ]*$"
    // 
    public static readonly dateFormat = "^(\\d{2}\/\\d{2}\/\\d{4})"
    // "
    public static readonly contentValidate = {
        isEmpty:"* Không được để trống",
        atLeastNum_Let:"* Chỉ được nhập chữ hoặc số",
        isLetter:"* Chỉ được nhập chữ",
        isNum:"* Chỉ được nhập số",
        atLeast2C: "* Ít nhất 2 kí tự nhiều nhất 50 kí tự",
        atLeast4C: "* Ít nhất 4 kí tự nhiều nhất 50 kí tự",
        atLeast8C: "* Ít nhất 8 kí tự nhiều nhất 100 kí tự",
        atLeast2to10C: "* Ít nhất 2 kí tự nhiều nhất 10 kí tự",
        atLeast15C: "* Tối đa 15 kí tự",
        atLeast12C: "* Ít nhất 9 nhiều nhất 15 kí tự",
        atLeast10C: "* Ít nhất 10 nhiều nhất 11 kí tự",
        isEmail:"* Phải đúng định dạng vd:abcd@gmail.com hoặc abcd@fpt.edu.vn",
        isPhone:"* Phải đúng định dạng điện thoại",
        isPassword: "* Chứa ít nhất 1 chữ hoa, 1 chữ thường, và 1 số",
        notspace: "* Không được nhập kí tự đặc biệt",
        matchformat: "* Nhập đúng định dạng",
        matchDateFormat: "* Đúng định dạng VD: 21/12/2022",
        matchPassword: "* Xác nhận mật khẩu không khớp"
    }
   
}