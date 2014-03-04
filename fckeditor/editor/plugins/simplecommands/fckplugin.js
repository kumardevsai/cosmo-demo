﻿/*
 * This plugin register Toolbar items for the combos modifying the style to
 * not show the box.
 */

FCKToolbarItems.RegisterItem( 'SourceSimple'	, new FCKToolbarButton( 'Source', FCKLang.Source, null, FCK_TOOLBARITEM_ONLYICON, true, true, 1 ) ) ;
FCKToolbarItems.RegisterItem( 'StyleSimple'		, new FCKToolbarStyleCombo( null, FCK_TOOLBARITEM_ONLYTEXT ) ) ;
FCKToolbarItems.RegisterItem( 'FontNameSimple'	, new FCKToolbarFontsCombo( null, FCK_TOOLBARITEM_ONLYTEXT ) ) ;
FCKToolbarItems.RegisterItem( 'FontSizeSimple'	, new FCKToolbarFontSizeCombo( null, FCK_TOOLBARITEM_ONLYTEXT ) ) ;
FCKToolbarItems.RegisterItem( 'FontFormatSimple', new FCKToolbarFontFormatCombo( null, FCK_TOOLBARITEM_ONLYTEXT ) ) ;
