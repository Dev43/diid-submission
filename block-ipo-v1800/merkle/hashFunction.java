package com.diid;

import java.security.MessageDigest;

/**
 * Created by duncan on 2016-11-26.
 */
public class hashFunction {

    public static String sha256(String base) {
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(base.getBytes("UTF-8"));
            StringBuffer hexString = new StringBuffer();

            for (int i = 0; i < hash.length; i++) {
                String hex = Integer.toHexString(0xff & hash[i]);
                if(hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString();
        } catch(Exception ex){
            throw new RuntimeException(ex);
        }
    }

    public static String createRoot(Share[] authorizedShares){

        try{
        int counter = authorizedShares.length;
        String[] shareIdList = new String[authorizedShares.length];
        String[] level2 = new String[authorizedShares.length/2];
        String[] level3 = new String[authorizedShares.length/4];
        String top = null;

        do {
            if(counter == 2){ counter = 1;}
            int i= 0;
            for (i = 0; i < authorizedShares.length; i=+2) {
                shareIdList[i] = authorizedShares[i].getId();
                shareIdList[i + 1] = authorizedShares[i].getId();
                level2[i] = sha256(shareIdList[i] + shareIdList[i + 1]);
                //shift the levels.
                shareIdList = level2;
                level3 = level2;

            }
        counter = counter -1;
        }while(counter == 1);

        level3[0] = top;
        return top;}
        catch (Exception  e){
            return null;
        }
    }

}
