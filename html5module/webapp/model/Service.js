sap.ui.define(["sap/ui/model/odata/v2/ODataModel"], function (ODataModel) {

	return {
		_ODataModel: {},

		readCustomers: function(fnSuccess,fnError) {
			return this._ODataModel.read("/Customers('ALFKI')",{
                success: fnSuccess,
                error: fnError
            });
		}
	};

});