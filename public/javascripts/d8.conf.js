( typeof m8 != 'undefined' ? m8 : require( 'm8' ) ).x.cache( 'Date', function( Type, util ) {
	util.def( Type, 'locale', util.describe( { value : {
		id                  : 'en-US',
		AM                  : 'am',
		PM                  : 'pm',
		days                : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		day_count           : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		formats             : {
			server_date     : 'Y-m-d',
			server_datetime : 'Y-m-d<T>H:i:sP',
			server_time     : 'H:i:s',
			short_date      : 'm/d/Y',
			short_time      : 'h:ia'
		},
		months              : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		ordinal             : ['th', 'st', 'nd', 'rd', 'th'],
		ordinal_day_count   : [
			[0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
			[0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366]
		],
		getOrdinal          : function( d ) { return ( d > 3 && d < 21 ) ? Type.locale.ordinal[0] : Type.locale.ordinal[Math.min( d % 10, 4 )]; },
		isLeapYear          : function( y ) { return !!( y && ( ( new Type( y, 1, 29 ) ).getDate() == 29 && ( y % 100 || y % 400 == 0 ) ) ); },
		setLeapYear         : function( d ) { Type.locale.day_count[1] = Type.locale.isLeapYear( d.getFullYear() ) ? 29 : 28; }
	} }, 'w' ) );
} );
