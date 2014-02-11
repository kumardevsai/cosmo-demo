package com.example.test_lay;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.TabHost;
import android.widget.TabHost.TabSpec;

public class MainActivity extends Activity {

	private TabHost tabHost;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		tabHost = (TabHost) this.findViewById(R.id.tabHost);

		TabSpec webViewHtml = tabHost.newTabSpec("webViewHtml");
		View tabViewHtml = this.getLayoutInflater().inflate(R.layout.tab,
				tabHost, false);
		webViewHtml.setIndicator(tabViewHtml);
		webViewHtml.setContent(new WebViewHtml(this, tabHost));
		tabHost.addTab(webViewHtml);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
