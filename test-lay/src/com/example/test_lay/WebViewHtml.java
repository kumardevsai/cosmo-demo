package com.example.test_lay;

import android.app.Activity;
import android.view.View;
import android.widget.TabHost;
import android.widget.TabHost.TabContentFactory;

public class WebViewHtml implements TabContentFactory {
	private Activity activity;

	private TabHost tabHost;

	public WebViewHtml(Activity activity, TabHost tabHost) {
		this.activity = activity;
	}

	@Override
	public View createTabContent(String arg0) {
		View view = activity.getLayoutInflater().inflate(R.layout.webview_html,
				tabHost, false);
		return view;
	}

}
