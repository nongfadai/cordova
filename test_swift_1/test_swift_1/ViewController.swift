//
//  ViewController.swift
//  test_swift_1
//
//  Created by millerliu on 15-6-20.
//  Copyright (c) 2015年 millerliu. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var webview1: UIWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //var res = NSBundle.mainBundle().pathForResource("index",ofType:!"html")
        //var url = NSURL(res)
        
        
        var try6 = NSBundle.mainBundle().pathForResource("index", ofType:"html",inDirectory: "www");
        println(try6);
        
        var url = NSURL(fileURLWithPath:try6!);
        //var url=NSURL(string:"http://m.nongfadai.com");
        var request=NSURLRequest(URL: url!);
        //webview1.clipsToBounds
        //webview1.clipsToBounds=false;
        webview1.loadRequest(request);
        
        webview1.scrollView.clipsToBounds=false;
        webview1.clipsToBounds=false;
        //webview1.subviews[0].bounces=false;
        webview1.scrollView.scrollEnabled=true;
        webview1.scrollView.bounces=false;
        //  webview1.
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

