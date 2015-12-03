import {View} from "ui/core/view";
import dependencyObservable = require("ui/core/dependency-observable");
import proxyModule = require("ui/core/proxy");

export class FrescoDrawee extends View {
	 public static imageUriProperty = new dependencyObservable.Property(
        "imageUri",
        "FrescoDrawee",
        new proxyModule.PropertyMetadata(
            undefined,
            dependencyObservable.PropertyMetadataSettings.None,
            FrescoDrawee.onImageUriPropertyChanged));
			
			
			
	private static onImageUriPropertyChanged(args: any){
		var drawee = args.object;
		drawee.onImageUriChanged(args);
	}
	
	protected onImageUriChanged(args){
		
	}
	
	get imageUri(){
		return this._getValue(FrescoDrawee.imageUriProperty);
	}
	
	set imageUri(uri: string){
		this._setValue(FrescoDrawee.imageUriProperty, uri);
	}
}