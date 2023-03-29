<script>
import { useToast } from "vue-toastification";

export default {
  props: ["code"],
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async toastError() {
      // console.log(this.code);
      var desc = "";
      switch (this.code) {
        case 0:
          desc = "NO INTERNET DETECTED";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 101:
          desc = "COMPLETE REGISTRATION WITH SNAPPY TO LOGIN";
          this.toast.success(desc.replaceAll("_", " "), { timeout: 5000 });
          this.$router.push({
            path: "/account/",
            params: { signUp: "registration" },
          });
          break;
        case 200:
          desc = "SUCCESSFUL";
          this.toast.success(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 850:
          desc = "INVALID_USERNAME_OR_PASSWORD";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 852:
          desc = "INVALID_CODE_LINK";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 201:
          desc = "CREATED";
          this.toast.success(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 401:
          desc = "UNAUTHORIZED";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 490:
          desc = "LOCATION ERROR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 202:
          desc = "ACCEPTED";
          this.toast.success(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 776:
          desc = "INVALID_EMAIL_OR_USER_CODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 777:
          desc = "OTP_EXPIRED";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 778:
          desc = "REVALIDATE_TRANS_STATUS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 779:
          desc = "INVALID_BULK_RVSL_PASSWORD";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 780:
          desc = "INVALID_PLAN_TYPE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 781:
          desc = "INVALID_CUSTOMER_CODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 782:
          desc = "INVALID_PARTNER_CLASS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 783:
          desc = "INVALID_COUNTRY";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 784:
          desc = "INVALID_TRANS_TYPE_DESC";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 785:
          desc = "INVALID_CLUSTERMANAGER_CODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 786:
          desc = "INVALID_SUPERAGENT_CODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 787:
          desc = "INVALID_GENDER";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 788:
          desc = "INACTIVE_TERMINAL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 789:
          desc = "INVALID_KYC_FILETYPE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 790:
          desc = "INVALID_FILENAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 791:
          desc = "INVALID_FILE_CONTENT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 792:
          desc = "INVALID_ISFLAT_VALUE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 793:
          desc = "INVALID_SPLIT_SUM";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 794:
          desc = "INVALID_SPLIT_VALUE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 795:
          desc = "INVALID_MIN_VALUE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 796:
          desc = "INVALID_TRANS_TYPE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 797:
          desc = "INVALID_FEE_TITLE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 798:
          desc = "INVALID_FEE_VALUE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 799:
          desc = "INVALID_MAX_FEE_VALUE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 800:
          desc = "CONFIG ERROR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 802:
          desc = "SUSPECTED_FRAUD";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 803:
          desc = "INVALID_PROVIDER_NAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 804:
          desc = "PARTIALLY_REVERSED";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 805:
          desc = "AUTO_REVERSAL_FAILED";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 811:
          desc = "INVALID SCHEME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 810:
          desc = "INVALID_RETRIEVAL_REFERENCE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 812:
          desc = "INVALID SERVICE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 813:
          desc = "INVALID WALLET";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 814:
          desc = "INVALID ACCOUNT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 815:
          desc = "INVALID_FEE_CODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 816:
          desc = "INSUFFICIENT BALANCE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 817:
          desc = "TRANSACTION NOT PERMITED TERMINAL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 818:
          desc = "TRANSACTION NOT PERMITED WALLET";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 819:
          desc = "INVALID CURRENCY";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 820:
          desc = "TRANS SRC AND DEST CANNOT BE SAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 821:
          desc = "TRANSACTION NOT FOUND";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 822:
          desc = "INVALID PAYMENT REFERENCE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 823:
          desc = "EXPIRED JWT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 824:
          desc = "INVALID DEST ACCOUNT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 825:
          desc = "INVALID DOB";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 826:
          desc = "INVALID BVN";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 827:
          desc = "INVALID ENTITY";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 828:
          desc = "FORBIDDEN ACTION";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 829:
          desc = "INVALID START DATE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 830:
          desc = "INVALID END DATE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 831:
          desc = "DATE DISPARITY";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 832:
          desc = "INVALID REFCODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 833:
          desc = "INVALID INFLUENCER";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 834:
          desc = "INVALID INFLUENCER PREF CHANNEL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 835:
          desc = "USED MOBILE OR REFCODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 836:
          desc = "NO RECORD FOUND";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 837:
          desc = "INVALID CUSTOMER ID";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 838:
          desc = "INVALID CLIENT PREF";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 839:
          desc = "INVALID BILLER ID";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 840:
          desc = "BILL QUERY ERROR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 841:
          desc = "INVALID PRODUCT ID";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 842:
          desc = "INVALID BILLPAYMENT CATEGORY";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 843:
          desc = "INVALID PRODUCT NAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 844:
          desc = "INVALID BILLER CODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 845:
          desc = "WALLET SYNC ERROR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 850:
          desc = "INVALID USERNAME OR PASSWORD";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 851:
          desc = "INVALID USER";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 852:
          desc = "INVALID USER CODELINK";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 853:
          desc = "INVALID PASSWORD";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 854:
          desc = "INVALID CONFIRM PASSWORD";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 855:
          desc = "INVALID ACCOUNT CLASS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 856:
          desc = "INVALID ALIAS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 857:
          desc = "INVALID FREQUENCY";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 858:
          desc = "INVALID AGENT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 859:
          desc = "INVALID PARAM VALUE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 860:
          desc = "INVALID TERMINAL SERIAL NO";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 861:
          desc = "INVALID TERMINAL BRAND";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 862:
          desc = "DUPLICATE EMAIL ADDRESS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 863:
          desc = "INVALID MESSAGE ID";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 864:
          desc = "INVALID MESSAGE SRC OR DEST";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 865:
          desc = "INVALID PARAM VALUE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 866:
          desc = "INVALID USER JWT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 867:
          desc = "INVALID REVIEWER COMMENT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 868:
          desc = "INVALID LOTTEE ID";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 869:
          desc = "INVALID IMAGE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 870:
          desc = "INVALID CLIENT CATEGORY";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 871:
          desc = "INVALID CLIENT NAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 872:
          desc = "INVALID PARTNER ID";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 873:
          desc = "EXPIRED USER SESSION"; // JWT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 874:
          desc = "INVALID VERIFICATION URL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 400:
          this.toast.error(`Please check your Username and Password`, {
            timeout: 5000,
          });
          break;
        case 401:
          this.toast.error(`Unauthorized Access`, {
            timeout: 5000,
          });
          break;
        case 403:
          this.toast.error(`Access Forbidden`, {
            timeout: 5000,
          });
          break;
        case 404:
          this.toast.error(`RESOURCE NOT FOUND`, {
            timeout: 5000,
          });
          break;
        case 429:
          this.toast.error(`You have submitted too many responses`, {
            timeout: 5000,
          });
          break;
        case 500:
          this.toast.error(`Please check your Username and Password`, {
            timeout: 5000,
          });
          break;
        case 503:
          this.toast.error(`Login Unavailable`, { timeout: 5000 });
          break;

        case 875:
          desc = "INVALID FULLNAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 876:
          desc = "INVALID WALLET NAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 878:
          desc = "INVALID OVERDRAFT LIMIT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 879:
          desc = "INVALID TELCO";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 880:
          desc = "BILL PAYMENT ERROR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 881:
          desc = "SUCCESSFULLY REVERSED";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 882:
          desc = "INVALID SOURCE WALLET";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 883:
          desc = "INVALID DEST WALLET";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 884:
          desc = "ERROR_CREATING_PAYABALE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 885:
          desc = "ERROR_CREATING_RECEIVABLE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 886:
          desc = "ERROR_CREATING_SERVICE_ACCOUNT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 887:
          desc = "INVALID_OPERATOR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 888:
          desc = "INVALID_OPERATOR_ID";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 889:
          desc = "INVALID_BENEFICIARY_NAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 890:
          desc = "INVALID_BENEFICIARY_BANK_CODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 891:
          desc = "INVALID_BENEFICIARY_BANK_NAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 892:
          desc = "INVALID_BENEFICIARY_ACCOUNT_NUMBER";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 893:
          desc = "INVALID_BENEFICIARY_ALIAS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 894:
          desc = "INVALID_BENEFICIARY";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 895:
          desc = "INVALID_PROCESSOR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 896:
          desc = "PASSWORD_SETUP_REQUIRED";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        /*     
            case 876:
                desc = "INVALID PIN"; 
          this.toast.error(desc.replaceAll('_',' '), { timeout: 5000 });
                 break;
             */
        case 901:
          desc = "INVALID CLIENT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 902:
          desc = "DECRYPTION ERROR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 903:
          desc = "INVALID TERMINAL ID";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 904:
          desc = "FORMAT ERROR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 905:
          desc = "DATABASE ERROR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 906:
          desc = "SYSTEM ERROR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 907:
          desc = "COMM LINK";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 908:
          desc = "ACCOUNT EXISTS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 911:
          desc = "ISSUER OR SWITCH";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 913:
          desc = "DUPLICATE REQUEST";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 914:
          desc = "INVALID PHONE NO";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 915:
          desc = "INVALID LASTNAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 916:
          desc = "INVALID FIRSTNAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 917:
          desc = "INVALID_EMAIL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 918:
          desc = "INVALID REQUEST ID";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 919:
          desc = "INVALID AMOUNT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 920:
          desc = "MALFORMED REQUEST";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 921:
          desc = "INVALID JSON FORMAT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 922:
          desc = "INVALID_PARTNER_CATEGORY";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 923:
          desc = "INVALID DOMAIN";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 924:
          desc = "INVALID PARTNER CODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 925:
          desc = "INVALID TRANSACTION";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 926:
          desc = "SECURITY VIOLATION";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 927:
          desc = "INVALID ROLE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 928:
          desc = "TRANSACTION FORBIDDEN";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 929:
          desc = "INVALID USERNAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 930:
          desc = "INVALID SCHEMENAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 931:
          desc = "INVALID SCHEMENAME SHORTCODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 932:
          desc = "INVALID SCHEME RATE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 933:
          desc = "INVALID EFFECTIVE DATE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 934:
          desc = "INVALID NOTIFICATION DATE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 935:
          desc = "INVALID SCHEME POSITION";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 936:
          desc = "INVALID BANK";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 937:
          desc = "INVALID DESCRIPTION";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 938:
          desc = "SECURITY VIOLATION BL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 939:
          desc = "LIMIT_EXCEEDED";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 940:
          desc = "ERROR VERIFYING APPROVAL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 941:
          desc = "APPROVAL ERROR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 942:
          desc = "IO EXCEPTION";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 943:
          desc = "INVALID PAGE ID OR FETCH SIZE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 944:
          desc = "OBJECT_CONFLICT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 945:
          desc = "INVALID TERMINAL MAPPING";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 946:
          desc = "INVALID QTY";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 947:
          desc = "INVALID SPONSOR NAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 948:
          desc = "INVALID TOKEN AGE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 949:
          desc = "PASSWORD MISMATCH";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 950:
          desc = "INALID NOTIFICATION RESPONSE CODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 951:
          desc = "INVALID_AUTHCODE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 952:
          desc = "INACTIVE_PREAPPROVAL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 953:
          desc = "INVALID TOKEN";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 954:
          desc = "INVALID MENU NAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 955:
          desc = "INVALID PARENT MENU";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 956:
          desc = "INVALID URL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 957:
          desc = "INVALID SPONSOR NAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 958:
          desc = "INVALID IP ADDRESS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 959:
          desc = "USER WITH EMAIL OR PHONE NUMBER EXISTS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 960:
          desc = "PASSWORD CHANGE REQUIRED";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 961:
          desc = "INVALID DEFAULT PASSWORD";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 962:
          desc = "INVALID BUSINESS NAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 963:
          desc = "INVALID ADDRESS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 964:
          desc = "INVALID STATE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 965:
          desc = "INVALID PIN";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 966:
          desc = "INVALID VERIFY PIN";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 967:
          desc = "INACTIVE USER ACCOUNT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 968:
          desc = "PASSWORD TOO SIMPLE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 969:
          desc = "INVALID IMAGE URL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 970:
          desc = "INVALID COMMENTS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 971:
          desc = "PIN TOO SIMPLE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 972:
          desc = "PIN CHANGE REQUIRED";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 973:
          desc = "INVALID TIER";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 974:
          desc = "WEAK PIN";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 975:
          desc = "INVALID SRC ACCOUNT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 976:
          desc = "INVALID KYC INFO";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 977:
          desc = "OTP VALIDATION PENDING";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 978:
          desc = "INVALID NAME ENQ SESSION ID";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 979:
          desc = "INVALID DEST ACCOUNT NAME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 980:
          desc = "INVALID MOBILE TOKEN";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 981:
          desc = "NO SUCH PAGE BASED ON AVAILABLE DATA";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 982:
          desc = "INVALID NOTIFICATION OPTION";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 983:
          desc = "INVALID TOKEN OR ACCOUNT NUMBER";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 984:
          desc = "INVALID ADDRESSEE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 985:
          desc = "INVALID NOTIFICATION SUBJECT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 986:
          desc = "NOTIFICATION ERROR";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 987:
          desc = "INVALID TOKEN OR ACCOUNT NUMBER LABEL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 988:
          desc = "INVALID FEE SPLIT";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 989:
          desc = "INVALID_BROADCAST_RECIPIENTS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 990:
          desc = "INVALID_BROADCAST_TIME";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 991:
          desc = "INVALID_RRN";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 992:
          desc = "INVALID_STAN";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 993:
          desc = "INVALID_POS_TRANS_TYPE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 994:
          desc = "INVALID_CARD_TYPE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 995:
          desc = "INVALID_POS_STATUS";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 996:
          desc = "CONSIDER_REVERSAL";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 997:
          desc = "AWAITING PARTNER CONFIRMATION";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
        case 998:
          desc = "FEE_SPLIT_MUST_BE ADD UP TO A TOTAL OF 100 %";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        case 999:
          desc = "INVALID FEE";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;

        default:
          desc = "UNKOWN ERROR CONTACT ADMIN ";
          this.toast.error(desc.replaceAll("_", " "), { timeout: 5000 });
          break;
      }
    },
  },
  created() {
    this.toastError();
  },
};
</script>
<template></template>
